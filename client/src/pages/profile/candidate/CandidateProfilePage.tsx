import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import {
	candidateGetProfileApi,
	deleteResumeApi,
	updateCandidateSkillsProfileApi,
	uploadCandidateImageProfileApi,
	uploadCandidateResumeProfileApi,
} from "../../../axios/apiMethods/profile-service/candidate";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { hotToastMessage } from "../../../utils/toastMessage";
import ImageFileUpload from "../../../components/upload/ImageFileUpload";
// import ProfileResumeDisplay from "../../../components/upload/ProfileResumeDisplay";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { myFirebaseStorage } from "../../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getACandidateProfileApi } from "../../../axios/apiMethods/profile-service/recruiter";
import { FaFacebookMessenger } from "react-icons/fa";
import Swal from "sweetalert2";
import CircleLoading from "../../../components/loading/CircleLoading";
import { setCandidateProfileDetails } from "../../../redux/slice/candidateSlice/candidateProfileSlice";
import { hotToastMessage } from "../../../utils/hotToastMessage";


const CandidateProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch()

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const isRecruiterUrl = location.pathname.includes("recruiter");

	const [candidateProfileData, setCandidateProfileData] = useState<any>([]);

	const [skills, setSkills] = useState<any>([]);
	const [skill, setSkill] = useState<any>("");
	const [addSkillRerender, setAddSkillRerender] = useState(0);
	const [imgLoading, setImgLoading] = useState<boolean>(false);
	const [pdfLoading, setPdfLoading] = useState<boolean>(false);

	console.log("skills--------  ", skills);

	const handleSetSkill = async (e: any) => {
		setSkill(e.target.value);
	};

	const handleSetSkills = async () => {
		if (!skill) return;
		setSkills([...skills, skill]);
		setSkill("");
	};

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const { candidateId } = useParams(); // and used when recruiter view user profile
	useEffect(() => {
		(async () => {
			let candidateDataId = candidateData ?? null; // used when candidate see his profile
			let id = candidateDataId?.id;
			let candidateProfile;
			if (isRecruiterUrl) {
				candidateProfile = await getACandidateProfileApi(
					candidateId ?? id
				);
			} else {
				candidateProfile = await candidateGetProfileApi(
					candidateId ?? id
				);
			}

			console.log(
				"/////////////////////candidateProfile ",
				candidateProfile
			);

			setCandidateProfileData(candidateProfile.data);
			dispatch(setCandidateProfileDetails(candidateProfile?.data))
			setSkills([...candidateProfile?.data.keySkills]);
		})();
	}, [addSkillRerender]);

	const handleResumeUpload = async () => {
		try {
			// const formData = new FormData();
			// formData.append("file", selectedFile);
			if (selectedFile) {
				// Perform the upload action here
				console.log("in handleUpload selectedFile", selectedFile);

				console.log("File uploaded:", selectedFile);
				console.log("File uploaded:", selectedFile.name);
				// console.log("File uploaded fortData:", formData);
				const resumeRef = ref(
					myFirebaseStorage,
					`devHiveResume/${uuidv4()}`
				);
				setPdfLoading(true);
				const uploadResume = await uploadBytesResumable(
					resumeRef,
					selectedFile
				);
				const downloadURL = await getDownloadURL(uploadResume.ref);

				console.log("After upload //// ", uploadResume);
				console.log("//// Download URL: //// ", downloadURL);

				const response = await uploadCandidateResumeProfileApi(
					candidateData.id,
					{ filename: selectedFile.name, url: downloadURL }
				);
				console.log("resume upload response", response);
				if (response.data) {
					// setCandidateProfileData({
					// 	...candidateProfileData,
					// 	resume: response.data.resume,
					// });

					// setCandidateProfileData({
					// 	...candidateProfileData,
					// 	resume: updatedCandidate.data.resume,
					// });

					setCandidateProfileData({
						...candidateProfileData,
							resume: response.data.resume
					});

					dispatch(setCandidateProfileDetails(response?.data))
					hotToastMessage(response.message, "success")
					
					return response.data;
				} else {
					hotToastMessage("resume not uploaded", "error");
				}
			}
		} catch (error: any) {
			// console.log("drrer",error);
			// hotToastMessage("file is size is > 1mb", "error");
			hotToastMessage(error.response.data.errors[0].message, "error");
		} finally {
			setPdfLoading(false);
		}
	};

	const handleResumeDelete = () => {
		console.log("resume delete click");

		Swal.fire({
			title: `Do you want to delete this resume`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `Yes, delete`,
		}).then(async (result) => {
			if (result.isConfirmed) {
				// const updatedCandidate = await blockUnblockCandidateApi(userId);
				const updatedCandidate = await deleteResumeApi(
					candidateData.id
				);

				console.log("resume delete ");

				if (updatedCandidate) {
					// setCandidateProfileData({
					// 	...candidateProfileData,
					// 	resume: updatedCandidate.data.resume,
					// });

					setCandidateProfileData({
						...candidateProfileData,
							resume: updatedCandidate.data.resume,
					});

					// setCandidateProfileData({
					// 	...candidateProfileData,
					// 	data: {
					// 		...candidateProfileData.data,
					// 		profile_image: response.data.profile_image,
					// 	},
					// });
					// setAddSkillRerender(addSkillRerender + 1);
					hotToastMessage(updatedCandidate.message, "success");
				}
			}
		});
	};

	const handleSaveSkills = async () => {
		try {
			const response = await updateCandidateSkillsProfileApi(
				candidateData.id,
				skills
			);
			console.log("resume skills update response", response);
			if (response.data) {
				hotToastMessage(response.message, "success");
				setAddSkillRerender(addSkillRerender + 1);
				return response.data;
			} else {
				hotToastMessage("skills not uploaded", "error");
			}
		} catch (error: any) {
			// console.log("drrer",error);
			// notify("file is size is > 1mb", "error");
			hotToastMessage(error.response.data.errors[0].message, "error");
		}
	};

	const handleImageUpload = async (selectedFile: File) => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			console.log("File uploaded:", selectedFile);
			setImgLoading(true);
			const response = await uploadCandidateImageProfileApi(
				candidateData.id,
				formData
			);
			console.log("resume image upload response", response);
			if (response.data) {
				hotToastMessage(response.message, "success")
				setCandidateProfileData({
					...candidateProfileData,
						profile_image: response.data.profile_image,
				});
				dispatch(setCandidateProfileDetails(response?.data))
				navigate("/candidate/profile");
				return response.data;
			} else {
				hotToastMessage("resume not uploaded", "error");
			}
		} catch (error: any) {
			hotToastMessage(error.response.data.errors[0].message, "error");
		} finally {
			setImgLoading(false); // Set loading to false after upload completes (whether success or failure)
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		console.log("in file upload event.target.files ", files);

		if (files && files.length > 0) {
			const selected = files[0];
			setSelectedFile(selected);
		}
	};

	console.log("7777777777777777777777", candidateProfileData);

	return (
		<div>
			{!isRecruiterUrl && <TopNavBarCandidate />}

			<main className="h-full flex items-center justify-center">
				<div className="bg-gray-200 md:w-9/12 p-8 mt-3 mb-3">
					<div className="w-md mx-auto bg-white p-8 rounded shadow-md">
						<div className="hero h-56 bg-base-200 relative">
							<div className="hero-content flex-col justify-center gap-5  lg:flex-row-reverse">
								{!isRecruiterUrl && !imgLoading && (
									<ImageFileUpload
										uploadImage={handleImageUpload}
									/>
								)}
								{imgLoading && <CircleLoading />}
								{!imgLoading && (
									<img
										src={
											candidateProfileData
												?.profile_image
										}
										className="w-1/6 max-w-sm rounded-full shadow-2xl"
										alt="CandidateProfilePage"
									/>
								)}
								<div className="flex flex-col items-start ">
									<h1 className="text-5xl font-bold">
										I'm{" "}
										{candidateProfileData?.name ??
											candidateData?.name}
									</h1>
									{/* <p className="py-6">
										{candidateProfileData?.about}
									</p> */}
									{isRecruiterUrl && (
										<div>
											<FaFacebookMessenger
												onClick={() =>
													navigate(
														`/recruiter/chat/${candidateProfileData?.id}` // Add the path to your chat page
													)
												}
												className="text-5xl cursor-pointer absolute top-0 right-0 mr-6 mt-20"
											/>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Profile information */}
						<div className="">
							<div className="flex justify-between  items-center">
								<h2 className="text-xl font-bold">
									Profile Information
								</h2>
								{!isRecruiterUrl && (
									<button
										onClick={() =>
											navigate(`/candidate/edit-profile`)
										}
										className="btn btn-primary  m-4"
									>
										Edit
									</button>
								)}
							</div>
							<div className="flex flex-col w-full border-opacity-50 ">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Name:{" "}
										{candidateProfileData?.name ??
											candidateData?.name}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Email:{" "}
										{candidateProfileData?.email ??
											candidateData?.email}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Phone:{" "}
										{candidateProfileData?.phone ??
											candidateData?.phone}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										About:{" "}
										{candidateProfileData?.about ??
											"Not specified"}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Gender:{" "}
										{candidateProfileData?.gender ??
											"Not specified"}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Current Location:{" "}
										{candidateProfileData
											?.currentLocation ??
											"Not specified"}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Experience:{" "}
										{candidateProfileData
											?.experience ?? "Not specified"}
									</div>
								</div>
							</div>

							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Address:{" "}
										{candidateProfileData?.address ??
											"Not specified"}
									</div>
								</div>
							</div>

							<div className="bg-gray-100 p-6 my-6 rounded-lg shadow-md">
								{candidateProfileData?.resume && (
									<>
										<label className="block mb-4 text-lg font-semibold">
											Resume
										</label>
										<div className=" max-w-fit p-2 my-5 flex items-c
										
										enter gap-3 border border-gray-400">
											{
												candidateProfileData
													?.resume?.filename
											}
											{!isRecruiterUrl && (
												<div
													className="tooltip tooltip-top"
													data-tip="delete resume"
												>
													<MdDelete
														onClick={
															handleResumeDelete
														}
													/>
												</div>
											)}

											<div
												className="tooltip tooltip-top"
												data-tip="view resume"
											>
												<Link
													to={
														candidateProfileData?.resume?.url
													}
												>
													<FaEye />
												</Link>
											</div>
										</div>
									</>
								)}

								<label className="block mb-4 text-lg font-semibold">
									{!isRecruiterUrl &&
										(candidateProfileData?.resume
											? "Change Your Resume"
											: "Upload Your Resume")}
								</label>
								<div className="flex items-center justify-between space-x-2">
									{!isRecruiterUrl && (
										<div>
											<input
												type="file"
												name="image"
												// accept=".pdf, .doc, .docx"
												accept=".pdf "
												className="border-2 border-gray-300 p-2 w-64"
												onChange={handleFileChange}
											/>

											<button
												type="button"
												onClick={handleResumeUpload}
												className="bg-blue-500 ml-4 text-white p-2 w-24  rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
												disabled={pdfLoading}
											>
												{pdfLoading ? (
													<CircleLoading /> // Show loading spinner when uploading
												) : (
													"Upload"
												)}
											</button>
										</div>
									)}
								</div>
								{selectedFile && (
									<p className="mt-4">
										Selected File: {selectedFile?.name}
									</p>
								)}
							</div>
						</div>

						{/* ====modal start ==== */}
						{/* Put this part before </body> tag */}

						<input
							type="checkbox"
							id="my_modal_6"
							className="modal-toggle"
						/>

						<div className="modal " role="dialog">
							<div className="modal-box">
								<h3 className="font-bold text-lg">
									Add yout key skills
								</h3>

								<div className="flex gap-3 mt-3 mb-3">
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered input-accent w-full max-w-xs"
										value={skill}
										onChange={handleSetSkill}
									/>
									<label
										className="btn"
										onClick={handleSetSkills}
									>
										Add Skill
									</label>
								</div>
								<ul className="list-none flex flex-wrap gap-2 ">
									{/* Add more skills based on your data */}
									{skills.length > 0 &&
										skills.map((skill: string) => (
											<div
												key={skill}
												className="badge text-white bg-sky-700 p-4 flex flex-row gap-2"
											>
												<li>{skill}</li>
												<span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														className="inline-block w-4 h-4 stroke-current hover: cursor-pointer "
														onClick={() => {
															console.log(
																"X clicked"
															);

															let skillsAfterRemove =
																skills.filter(
																	(
																		currentSkill: string
																	) => {
																		return (
																			currentSkill !==
																			skill
																		);
																	}
																);
															setSkills(
																skillsAfterRemove
															);
														}}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M6 18L18 6M6 6l12 12"
														></path>
													</svg>
												</span>
											</div>
										))}
								</ul>
								<div className="modal-action">
									<label
										htmlFor="my_modal_6"
										className="btn rounded-xl"
									>
										Close
									</label>
									<label
										htmlFor="my_modal_6"
										className="btn rounded-xl bg-yellow-600"
										onClick={handleSaveSkills}
									>
										Save skills
									</label>
								</div>
							</div>
						</div>
						{/* ====modal end ==== */}
						{/* Skills */}
						<div className="bg-gray-100 p-6 my-6 rounded-lg shadow-md">
							<div className="">
								<p className="flex items-center gap-4">
									<span className="text-xl font-bold mb-2">
										Skills{" "}
									</span>
									{/* The button to open modal */}
									<span
										className="tooltip tooltip-top"
										data-tip="add or edit skills"
									>
										{!isRecruiterUrl && (
											<label htmlFor="my_modal_6">
												<FaEdit />
											</label>
										)}
									</span>
								</p>

								<ul className="list-none flex flex-wrap gap-2">
									{/* Add more skills based on your data */}
									{skills.length > 0 &&
										candidateProfileData?.keySkills.map(
											(skill: string) => (
												<div
													key={skill}
													className="badge text-white bg-sky-700 p-4 flex flex-row gap-2"
												>
													<li>{skill}</li>
												</div>
											)
										)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</main>
			{!isRecruiterUrl && <Footer />}
		</div>
	);
};

export default CandidateProfilePage;
