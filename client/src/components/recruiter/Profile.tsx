// Profile.tsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { recruiterGetProfileApi } from "../../api/axios/profile/recruiter";

const Profile: React.FC = () => {

	const recruiterData = useSelector(
		(state: RootState) => state.recruiterData.recruiter
	);

	const [recruiterProfileData, setRecruiterProfileData] = useState<any>([]);
	// const [updateCandidateProfileData, setUpdateCandidateProfileData] = useState<
	// 	any
	// >([]);

	useEffect(() => {
		(async () => {
			console.log("before",recruiterData);
			
			const { id } = recruiterData;
			const candidateProfile = await recruiterGetProfileApi(id);
			console.log("candidateGetProfileApi", candidateProfile);
			
			setRecruiterProfileData(candidateProfile);
		})();
	}, []);
	return (
		<div className="bg-gray-200 min-h-screen md: w-9/12 p-8 mt-16">
			<div className="w-md mx-auto bg-white p-8 rounded shadow-md">
				<div className="hero h-56 bg-base-200 relative">
					<div className="hero-content flex-col lg:flex-row-reverse">
						<img
							src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
							className="w-1/6 max-w-sm rounded-lg shadow-2xl"
						/>
						<div className="flex flex-col items-start lg:items-end">
							<h1 className="text-5xl font-bold">
								I'm {(recruiterProfileData?.data?.data?.name)?? recruiterData.name}
							</h1>
							<p className="py-6">
							{recruiterProfileData?.data?.data?.about}
							</p>
							<button className="btn btn-primary absolute top-0 right-0 m-4">
								Edit
							</button>
						</div>
					</div>
				</div>

				{/* Add more profile information as needed */}
				<div className="flex flex-col w-full border-opacity-50 mt-3">
					<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
						<div className="text-left">
							Name: {(recruiterProfileData?.data?.data?.name) ?? recruiterData.name}
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full border-opacity-50 mt-3">
					<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
						<div className="text-left">
							Email: {(recruiterProfileData?.data?.data?.email) ?? recruiterData.email}
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full border-opacity-50 mt-3">
					<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
						<div className="text-left">
							Phone: {(recruiterProfileData?.data?.data?.phone)?? recruiterData.phone}
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full border-opacity-50 mt-3">
					<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
						<div className="text-left">
							About: {recruiterProfileData?.data?.data?.about}
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full border-opacity-50 mt-3">
					<div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
						<div className="text-left">
							Current Location:{" "}
							{recruiterProfileData?.data?.data?.currentLocation}
						</div>
					</div>
				</div>

				<div className="mt-8">
					<h2 className="text-xl font-bold mb-2">Skills</h2>
					<ul className="list-disc pl-4">
						{}
						<li>React.js</li>
						<li>TypeScript</li>
						<li>Tailwind CSS</li>
						{/* Add more skills */}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Profile;
