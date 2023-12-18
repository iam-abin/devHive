// Profile.tsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { candidateGetProfileApi } from "../../api/axios/profile/candidate";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
	const navigate = useNavigate();
	const candidateData = useSelector(
		(state: RootState) => state.candidateData.candidate
	);

	const [candidateProfileData, setCandidateProfileData] = useState<any>([]);

	useEffect(() => {
		(async () => {
			const { id } = candidateData;
			const candidateProfile = await candidateGetProfileApi(id);
			setCandidateProfileData(candidateProfile);
		})();
	}, [candidateData]);

	return (
		<div className="bg-gray-200 md:w-9/12 p-8 mt-60">
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
								{candidateProfileData?.data?.data?.name ??
									candidateData.name}
							</h1>
							<p className="py-6">
								{candidateProfileData?.data?.data?.about}
							</p>
							<button
								onClick={() =>
									navigate(
										`/candidate/edit-profile`
									)
								}
								className="btn btn-primary absolute top-0 right-0 m-4"
							>
								Edit
							</button>
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
								{candidateProfileData?.data?.data?.name ??
									candidateData.name}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Email:{" "}
								{candidateProfileData?.data?.data?.email ??
									candidateData.email}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Phone:{" "}
								{candidateProfileData?.data?.data?.phone ??
									candidateData.phone}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								About:{" "}
								{candidateProfileData?.data?.data?.about ??
									"Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Gender:{" "}
								{candidateProfileData?.data?.data?.gender ??
									"Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Current Location:{" "}
								{candidateProfileData?.data?.data
									?.currentLocation ?? "Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Experience:{" "}
								{candidateProfileData?.data?.data?.experience ??
									"Not specified"}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full border-opacity-50 mt-3">
						<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
							<div className="text-left">
								Address:{" "}
								{candidateProfileData?.data?.data?.address ??
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
					<ul className="list-disc pl-4">
						{/* Add more skills based on your data */}
						{candidateProfileData?.data?.data?.keySkills &&
							candidateProfileData.data.data.keySkills.map(
								(skill: string, index: number) => (
									<div className="badge badge-info gap-2">
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
										<li key={index}>{skill}</li>
									</div>
								)
							)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Profile;
