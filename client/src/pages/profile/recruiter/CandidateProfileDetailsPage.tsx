// CandidateProfileDetailsPage.tsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getACandidateProfileApi } from "../../../axios/apiMethods/profile-service/recruiter";
import TopNavBarRecruiter from "../../../components/navBar/TopNavBarRecruiter";

const CandidateProfileDetailsPage: React.FC = () => {
	const navigate = useNavigate();

	const { candidateId } = useParams();
	const location = useLocation();

	// Check if the pathname of the URL includes the term "recruiter"
	const isRecruiterUrl = location.pathname.includes("recruiter");

	const [candidateProfileData, setCandidateProfileData] = useState<any>([]);

	useEffect(() => {
		(async () => {
			if (candidateId) {
				const candidateProfile = await getACandidateProfileApi(
					candidateId
				);
				console.log("candidateProfile", candidateProfile);
				console.log("candidateProfile", candidateProfile.data.name);

				setCandidateProfileData(candidateProfile.data);
			}
		})();
	}, [candidateId]);

	return (
		<>
			<TopNavBarRecruiter />
			<div className="w-md mx-auto bg-white p-8 rounded shadow-md">
				<div className="hero h-56 bg-base-200 relative">
					<div className="hero-content flex-col lg:flex-row-reverse">
						<img
							src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
							className="w-1/6 max-w-sm rounded-lg shadow-2xl"
							alt="Profile"
						/>
						<div className="flex flex-col items-start lg:items-end">
							<h1 className="text-5xl font-bold">
								I'm{" "}
								{candidateProfileData?.name &&
									candidateProfileData.name}
							</h1>
							<p className="py-6">
								{candidateProfileData.about &&
									candidateProfileData.about}
							</p>
							{!isRecruiterUrl ? (
								<button
									onClick={() =>
										navigate(`/candidate/edit-profile`)
									}
									className="btn btn-primary absolute top-0 right-0 m-4"
								>
									Edit
								</button>
							) : null}
						</div>
					</div>
				</div>

				{/* Profile information */}
				<div className="mt-8">
					<h2 className="text-xl font-bold mb-2">
						Profile Information
					</h2>
					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Name:{" "}
								{candidateProfileData.name ?? "Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Email:{" "}
								{candidateProfileData.email ?? "Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Phone:{" "}
								{candidateProfileData.phone ?? "Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								About:{" "}
								{candidateProfileData.about ?? "Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Gender:{" "}
								{candidateProfileData.gender ?? "Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Current Location:{" "}
								{candidateProfileData?.currentLocation ??
									"Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Experience:{" "}
								{candidateProfileData.experience ??
									"Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Address:{" "}
								{candidateProfileData.address ??
									"Not specified"}
							</div>
						</div>
					</div>

					{/* Add more fields as needed */}
					{/* ... */}
				</div>

				{/* Skills */}
				<div className="mt-8">
					<h2 className="text-xl font-bold mb-2">Skills</h2>
					<ul className="list-none pl-4">
						{/* Add more skills based on your data */}
						{candidateProfileData.keySkills &&
							candidateProfileData.keySkills.map(
								(skill: string, index: number) => (
									<div
										className="badge badge-info mr-2 h-8"
										key={index}
									>
										<li className="flex items-center">
											{" "}
											{/* Use flex to align items horizontally */}
											{skill}
										</li>
									</div>
								)
							)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default CandidateProfileDetailsPage;