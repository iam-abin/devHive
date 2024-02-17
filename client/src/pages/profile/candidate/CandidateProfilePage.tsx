import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import {
	candidateGetProfileApi,
	uploadCandidateImageProfileApi,
	uploadCandidateResumeProfileApi,
} from "../../../axios/apiMethods/profile-service/candidate";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../utils/toastMessage";
import ImageFileUpload from "../../../components/upload/ImageFileUpload";
// import ProfileResumeDisplay from "../../../components/upload/ProfileResumeDisplay";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";

const CandidateProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const [candidateProfileData, setCandidateProfileData] = useState<any>([]);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	useEffect(() => {
		(async () => {
			const { id } = candidateData;
			const candidateProfile = await candidateGetProfileApi(id);
			setCandidateProfileData(candidateProfile);
		})();
	}, []);

	const handleResumeUpload = async (selectedFile: File) => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			console.log("File uploaded:", selectedFile);
			const response = await uploadCandidateResumeProfileApi(
				candidateData.id,
				formData
			);
			console.log("resume image upload response", response);
			if (response.data) {
				notify(response.message, "success");
				return response.data;
			} else {
				notify("resume not uploaded", "error");
			}
		} catch (error: any) {
			// console.log("drrer",error);
			// notify("file is size is > 1mb", "error");
			notify(error.response.data.errors[0].message, "error");
		}
	};

	const handleImageUpload = async (selectedFile: File) => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			console.log("File uploaded:", selectedFile);
			const response = await uploadCandidateImageProfileApi(
				candidateData.id,
				formData
			);
			console.log("resume image upload response", response);
			if (response.data) {
				notify(response.message, "success");
				setCandidateProfileData({
					...candidateProfileData,
					data: {
						...candidateProfileData.data,
						profile_image: response.data.profile_image,
					},
				});
				navigate("/candidate/profile");
				return response.data;
			} else {
				notify("resume not uploaded", "error");
			}
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
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

	const handleUpload = () => {
		if (selectedFile) {
			// Perform the upload action here
			console.log("in handleUpload selectedFile", selectedFile);

			handleResumeUpload(selectedFile);
		}
	};

	console.log("7777777777777777777777", candidateProfileData);

	const hi = () => {
		return "";
	};

	return (
		<div>
			<TopNavBarCandidate />
			<main className="h-full flex items-center justify-center">
				<div className="bg-gray-200 md:w-9/12 p-8 mt-3 mb-3">
					<div className="w-md mx-auto bg-white p-8 rounded shadow-md">
						<div className="hero h-56 bg-base-200 relative">
							<div className="hero-content flex-col  lg:flex-row-reverse">
								<ImageFileUpload
									uploadImage={handleImageUpload}
								/>
								<img
									src={
										candidateProfileData?.data
											?.profile_image
									}
									className="w-1/6 max-w-sm rounded-full shadow-2xl"
									alt="CandidateProfilePage"
								/>
								<div className="flex flex-col items-start  lg:items-end">
									<h1 className="text-5xl font-bold">
										I'm{" "}
										{candidateProfileData?.data?.name ??
											candidateData.name}
									</h1>
									<p className="py-6">
										{candidateProfileData?.data?.about}
									</p>
								</div>
							</div>
						</div>

						{/* Profile information */}
						<div className="">
							<div className="flex justify-between  items-center">
								<h2 className="text-xl font-bold">
									Profile Information
								</h2>
								<button
									onClick={() =>
										navigate(`/candidate/edit-profile`)
									}
									className="btn btn-primary  m-4"
								>
									Edit
								</button>
							</div>
							<div className="flex flex-col w-full border-opacity-50 ">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Name:{" "}
										{candidateProfileData?.data?.name ??
											candidateData.name}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Email:{" "}
										{candidateProfileData?.data?.email ??
											candidateData.email}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Phone:{" "}
										{candidateProfileData?.data?.phone ??
											candidateData.phone}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										About:{" "}
										{candidateProfileData?.data?.about ??
											"Not specified"}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Gender:{" "}
										{candidateProfileData?.data?.gender ??
											"Not specified"}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Current Location:{" "}
										{candidateProfileData?.data
											?.currentLocation ??
											"Not specified"}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Experience:{" "}
										{candidateProfileData?.data
											?.experience ?? "Not specified"}
									</div>
								</div>
							</div>

							{/* ahsefjjkds */}
							{/* <FileUpload onUpload={handleResumeUpload} /> */}
							{/* dfadfas */}
							{/* {candidateProfileData?.data?.resume && (
								<div>
									{/* <ProfileResumeDisplay
												resumeFile={hi}
												onEditResume={hi}
												onDeleteResume={hi}
											/> */}

							{/* <link
										rel="stylesheet"
										href={
											candidateProfileData?.data?.resume
										}
									/>
								</div>
							)} */}

							<div className="flex flex-col w-full border-opacity-50 mt-3">
								<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
									<div className="text-left">
										Address:{" "}
										{candidateProfileData?.data?.address ??
											"Not specified"}
									</div>
								</div>
							</div>

							<div className="bg-gray-100 p-6 my-6 rounded-lg shadow-md">
								<label className="block mb-4 text-lg font-semibold">
									{candidateProfileData?.data?.resume
										? "Change Your Resume"
										: "Upload Your Resume"}
								</label>
								<div className="flex items-center justify-between space-x-2">
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
											onClick={handleUpload}
											className="bg-blue-500 ml-4 text-white p-2  rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
										>
											Upload
										</button>
									</div>
									<Link
										className="text-blue-500 hover:underline"
										to={candidateProfileData?.data?.resume}
										target="_blank"
										rel="noopener noreferrer"
									>
										View Resume
									</Link>
								</div>
								{selectedFile && (
									<p className="mt-4">
										Selected File: {selectedFile.name}
									</p>
								)}
							</div>
						</div>

						{/* Skills */}
						<div className="mt-8">
							<h2 className="text-xl font-bold mb-2">Skills</h2>
							<ul className="list-none pl-4 ">
								{/* Add more skills based on your data */}
								{candidateProfileData?.data?.keySkills &&
									candidateProfileData.data.keySkills.map(
										(skill: string) => (
											<div
												key={skill}
												className="badge badge-info mr-2 h-8"
											>
												<li>{skill}</li>
												<p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														className="inline-block w-4 h-4 stroke-current"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M6 18L18 6M6 6l12 12"
														></path>
													</svg>
												</p>
											</div>
										)
									)}
							</ul>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default CandidateProfilePage;
