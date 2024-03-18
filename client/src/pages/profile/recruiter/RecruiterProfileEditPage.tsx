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
	company_name: string;
	company_website: string;
	company_location: string;
	company_state: string;
	company_country: string;
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
			notify(error.response.data.errors[0].message, "error");
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
		company_name: profileDetails?.company_name ?? undefined,
		company_website: profileDetails?.company_website ?? undefined,
		company_location: profileDetails?.company_location ?? undefined,
		company_state: profileDetails?.company_state ?? undefined,
		company_country: profileDetails?.company_country ?? undefined,
	};

	return (
		<div>
			<main className="h-full flex items-center justify-center">
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
								<div className="mb-5">
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
									<div className="h-1 w-full bg-black my-5"></div>
									{/* ======================== */}
									{/* Company Name field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="company_name"
											className="label"
										>
											Company Name
										</label>
										<Field
											type="text"
											id="company_name"
											name="company_name"
											className={`input input-primary w-full rounded-xl ${
												errors.company_name &&
												touched.company_name
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="company_name"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Website field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="company_website"
											className="label"
										>
											Company Website
										</label>
										<Field
											type="text"
											id="company_website"
											name="company_website"
											className={`input input-primary w-full rounded-xl ${
												errors.company_website &&
												touched.company_website
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="company_website"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Company Location field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="company_location"
											className="label"
										>
											Company Location
										</label>
										<Field
											type="text"
											id="company_location"
											name="company_location"
											className={`input input-primary w-full rounded-xl ${
												errors.company_location &&
												touched.company_location
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="company_location"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Company State field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="company_state"
											className="label"
										>
											Company State
										</label>
										<Field
											type="text"
											id="company_state"
											name="company_state"
											className={`input input-primary w-full rounded-xl ${
												errors.company_state &&
												touched.company_state
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="company_state"
											component="div"
											className="error label-text-alt"
										/>
									</div>

									{/* Company Country field */}
									<div className="form-control w-6/6">
										<label
											htmlFor="company_country"
											className="label"
										>
											Company Country
										</label>
										<Field
											type="text"
											id="company_country"
											name="company_country"
											className={`input input-primary w-full rounded-xl ${
												errors.company_country &&
												touched.company_country
													? "input-error"
													: ""
											}`}
										/>
										<ErrorMessage
											name="company_country"
											component="div"
											className="error label-text-alt"
										/>
									</div>
									{/* ======================== */}

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
