import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../redux/reducer/reducer";
import {
	recruiterGetProfileApi,
	updateRecruiterProfileApi,
} from "../../../axios/apiMethods/profile-service/recruiter";
import { notify } from "../../../utils/toastMessage";

interface ProfileFormData {
	name: string;
	email: string;
	phone: number;
	isVerified: boolean;
	isActive: boolean;
	gender?: string;
	company_id?: string;
	profile_image?: string;
	about?: string;
	userId: string;
}

function RecruiterProfileEditPage() {
	const [profileDetails, setProfileDetails] = useState<any>(null);
	const navigate = useNavigate();
	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);
	const { id } = recruiterData;

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				console.log("id is ", id);
				const profile = await recruiterGetProfileApi(id);
				setProfileDetails(profile.data);
				console.log("edit profile data is ", profile.data);
			} catch (error) {
				console.error("Error fetching profile details:", error);
			}
		};

		fetchProfileDetails();
	}, [id]);

	if (!profileDetails) {
		return <div>Loading...</div>;
	}

	const handleSubmit = async (profileData: ProfileFormData) => {
		try {
			const data = await updateRecruiterProfileApi(profileData);

			if (data.data) {
				notify("Profile updated successfully", "success");
				navigate("/recruiter/profile");
			} else {
				notify("Profile not updated", "error");
			}
		} catch (error: any) {
			// notify(error.response.data.errors[0].message, "error");
			notify("somthing went wrong", "error");
		}
	};

	const initialProfileValues: ProfileFormData = {
		name: profileDetails?.name ?? undefined,
		email: profileDetails?.email ?? undefined,
		phone: profileDetails?.phone ?? 0,
		isVerified: profileDetails?.isVerified ?? false,
		isActive: profileDetails?.isActive ?? false,
		gender: profileDetails?.gender ?? undefined,
		company_id: profileDetails?.company_id ?? undefined,
		profile_image: profileDetails?.profile_image ?? undefined,
		about: profileDetails?.about ?? undefined,
		userId: profileDetails?.id ?? undefined,
	};

	return (
		<div>
			<main className="h-screen flex items-center justify-center">
				<Formik
					initialValues={initialProfileValues}
					onSubmit={(values) => {
						handleSubmit(values);
					}}
				>
					{(formik) => {
						const { errors, touched } = formik;
						return (
							<div className="w-6/12 p-6">
								<div className="mb-16">
									<h1 className="text-center text-5xl font-bold">
										Edit Profile
									</h1>
									<div className="w-16 h-1 bg-black mx-auto my-4"></div>
								</div>

								<Form noValidate className="bg-slate-300 p-6">
									{/* Name field */}
									<div className="form-control w-6/6">
										<label htmlFor="name" className="label">
											Name
										</label>
										<Field
											type="text"
											id="name"
											name="name"
											className={`input input-primary w-full rounded-xl ${
												errors.name && touched.name
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="name"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Email field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="email"
											className="label"
										>
											Email
										</label>
										<Field
											type="email"
											id="email"
											name="email"
											className={`input input-primary w-full rounded-xl ${
												errors.email && touched.email
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Phone field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="phone"
											className="label"
										>
											Phone
										</label>
										<Field
											type="tel"
											id="phone"
											name="phone"
											className={`input input-primary w-full rounded-xl ${
												errors.phone && touched.phone
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="phone"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Gender field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="gender"
											className="label"
										>
											Gender
										</label>
										<Field
											type="text"
											id="gender"
											name="gender"
											className={`input input-primary w-full rounded-xl ${
												errors.gender && touched.gender
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="gender"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* About field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="about"
											className="label"
										>
											About
										</label>
										<Field
											as="textarea"
											id="about"
											name="about"
											className={`input input-primary w-full rounded-xl ${
												errors.about && touched.about
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="about"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									<div className="flex items-center justify-center mt-3 mb-3">
										<button
											type="submit"
											className="btn w-60 btn-primary"
										>
											Update Profile
										</button>
									</div>
								</Form>
							</div>
						);
					}}
				</Formik>
			</main>
		</div>
	);
}

export default RecruiterProfileEditPage;
