import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
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
	skills: string[];
	profileImage: string;
	about: string;
	resume: string;
	experience: string;
	userId: string;
}

function CandidateProfileEditPage() {

	const navigate = useNavigate();
	
	const candidateProfileData: any = useSelector(
		(store: RootState) => store.userReducer.myProfile
	);


	if (!candidateProfileData) {
		return <div>Loading...</div>;
	}

	const handleSubmit = async (profileData: ProfileFormData) => {
			const data = await updateCandidateProfileApi(profileData);
			if (data.data) {
				notify(data.message, "success");
				navigate("/candidate/profile");
			} else {
				notify("Profile not updated", "error");
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
		skills: candidateProfileData?.skills ?? [],
		profileImage: candidateProfileData?.profileImage ?? "",
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
								<div className="sm:w-full md:w-9/12 lg:w-7/12 p-8 mb-3">
									<div className="mb-6 w-full">
										<h1 className="text-center md:text-5xl font-bold">
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
