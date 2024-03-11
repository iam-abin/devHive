import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
	candidateGetProfileApi,
	updateCandidateProfileApi,
} from "../../../axios/apiMethods/profile-service/candidate";
import { notify } from "../../../utils/toastMessage";
import Footer from "../../../components/footer/Footer";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";


interface ProfileFormData {
	name: string;
	email: string;
	phone: number;
	isActive: boolean;
	gender: string;
	currentLocation: string;
	address: string;
	keySkills: string[];
	profile_image: string;
	about: string;
	resume: string;
	experience: string;
	userId: string;
}

function CandidateProfileEditPage() {
	const [profileDetails, setProfileDetails] = useState<any>(null);

	const navigate = useNavigate();
	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);
	const candidateProfileData: any = useSelector(
		(state: RootState) => state.candidateProfile.candidateProfile
	);

	console.log("candidateProfileData >>>>>>>>",candidateProfileData);
	
	const { id } = candidateData;

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				const profile = await candidateGetProfileApi(id);
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
			console.log("handleSubmit profiledata------------>", profileData);
			const data = await updateCandidateProfileApi(profileData);
			console.log("handleSubmit------------>", data);
			
			if (data.data) {
				notify(data.message, "success");
				navigate("/candidate/profile");
			} else {
				notify("Profile not updated", "error");
			}
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	const initialProfileValues: ProfileFormData = {
		name: candidateProfileData?.name ?? "",
		email: candidateProfileData?.email ?? "",
		phone: candidateProfileData?.phone ?? 0,
		isActive: candidateProfileData?.isActive ?? false,
		gender: candidateProfileData?.gender ?? "",
		currentLocation: candidateProfileData?.currentLocation ?? "",
		address: candidateProfileData?.address ?? "",
		keySkills: candidateProfileData?.keySkills ?? [],
		profile_image: candidateProfileData?.profile_image ?? "",
		about: candidateProfileData?.about ?? "",
		resume: candidateProfileData?.resume ?? "",
		experience: candidateProfileData?.experience ?? "",
		userId: candidateProfileData?.id ?? "",
	};

	return (
		<div>
			<div>
				<div>
					<TopNavBarCandidate />
				</div>
				<main className="mx-14 flex items-center justify-center">
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
									<div className="mb-6">
										<h1 className="text-center text-5xl font-bold">
											Edit Profile
										</h1>
										<div className="w-16 h-1 bg-black mx-auto my-4"></div>
									</div>

									<Form
										noValidate
										className="bg-slate-300 p-6"
									>
										{/* Name field */}
										<div className="form-control w-6/6">
											<label
												htmlFor="name"
												className="label"
											>
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
													errors.email &&
													touched.email
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
													errors.phone &&
													touched.phone
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

										{/* Gender field (radio button) */}
										<div className="form-control w-6/6">
											<label className="label">
												Gender
											</label>
											<div className="flex items-center space-x-4 mt-2">
												<label className="radio-label">
													<Field
														type="radio"
														name="gender"
														value="male"
														className="radio-input"
													/>
													Male
												</label>
												<label className="radio-label">
													<Field
														type="radio"
														name="gender"
														value="female"
														className="radio-input"
													/>
													Female
												</label>
											</div>
											<ErrorMessage
												name="gender"
												component="div"
												className="error label-text-alt"
											/>
										</div>

										{/* currentLocation field */}
										<div className="form-control w-6/6">
											<label
												htmlFor="currentLocation"
												className="label"
											>
												Current Location
											</label>
											<Field
												type="text"
												id="currentLocation"
												name="currentLocation"
												className={`input input-primary w-full rounded-xl ${
													errors.currentLocation &&
													touched.currentLocation
														? "input-error"
														: ""
												}`}
											/>
											<ErrorMessage
												name="currentLocation"
												component="div"
												className="error label-text-alt"
											/>
										</div>

										{/* address field */}
										<div className="form-control w-6/6">
											<label
												htmlFor="address"
												className="label"
											>
												Address
											</label>
											<Field
												type="text"
												id="address"
												name="address"
												className={`input input-primary w-full rounded-xl ${
													errors.address &&
													touched.address
														? "input-error"
														: ""
												}`}
											/>
											<ErrorMessage
												name="address"
												component="div"
												className="error label-text-alt"
											/>
										</div>

										{/* about field */}
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
													errors.about &&
													touched.about
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


										{/* experience field */}
										<div className="form-control w-6/6">
											<label
												htmlFor="experience"
												className="label"
											>
												Experience
											</label>
											<Field
												type="text"
												id="experience"
												name="experience"
												className={`input input-primary w-full rounded-xl ${
													errors.experience &&
													touched.experience
														? "input-error"
														: ""
												}`}
											/>
											<ErrorMessage
												name="experience"
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
				<div>
				<Footer />
				</div>
			</div>
		</div>
	);
}

export default CandidateProfileEditPage;
