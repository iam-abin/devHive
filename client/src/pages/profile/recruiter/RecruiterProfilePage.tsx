import { FaFacebookMessenger } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../../redux/reducer/reducer";
import { recruiterGetProfileApi } from "../../../axios/apiMethods/profile-service/recruiter";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";
import { recruiterGetProfileByCandidateApi } from "../../../axios/apiMethods/profile-service/candidate";

const RecruiterProfilePage: React.FC = () => {
	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	const { id } = useParams();
	console.log("99999999999", id);
	console.log("iam abbbbbbbbbbbbi");

	const location = useLocation();

	const isCandidate = location.pathname.includes("candidate");

	const [recruiterProfileData, setRecruiterProfileData] = useState<any>([]);

	const navigate = useNavigate();
	console.log("recruiterProfileData", recruiterProfileData);
	console.log("isCandidate", isCandidate);

	useEffect(() => {
		(async () => {
			console.log("Entering useEffect");
			console.log("Before", recruiterData);

			try {
				let recruiterProfile = null;
				if (isCandidate) {
					recruiterProfile = await recruiterGetProfileByCandidateApi(
						id!
					);
				} else {
					recruiterProfile = await recruiterGetProfileApi(
						recruiterData.id
					);
				}
				console.log("recruiterProfile", recruiterProfile);

				setRecruiterProfileData(recruiterProfile);
			} catch (error) {
				console.error("Error fetching recruiter profile:", error);
			}
		})();
	}, []);
	return (
		<div>
			<div>
				{isCandidate && <TopNavBarCandidate />}
				<main className="h-screen flex items-center justify-center">
					<div className="bg-gray-100 min-h-screen w-3/5 flex">
						{/* Main Content */}
						<div className="flex-1 p-8">
							<div className="bg-white p-8 shadow-md rounded-md">
								{isCandidate ? (
									<div className="text-center font-bold text-3xl">
										{" "}
										<h2>Recruiter Profile</h2>
									</div>
								) : (
									""
								)}
								<div className="flex items-center bg-emerald-100 rounded-3xl justify-between mb-6 shadow-xl p-5">
									<div>
										<img
											src="https://via.placeholder.com/150"
											alt="Recruiter Avatar"
											className="w-20 h-20 rounded-full mr-4"
										/>
										<div>
											<h1 className="text-2xl font-bold text-gray-800">
												{recruiterProfileData?.data
													?.name ??
													"recruiterData.name"}
											</h1>
										</div>
									</div>
									{isCandidate ? (
										<FaFacebookMessenger
											onClick={() =>
												navigate(
													`/candidate/chat/${recruiterProfileData?.data?.id}` // Add the path to your chat page
												)
											}
											className="text-3xl cursor-pointer"
										/>
									) : (
										<button
											onClick={() =>
												navigate(
													"/recruiter/edit-profile"
												)
											}
											className="bg-blue-500 text-white px-4 py-2 rounded-md"
										>
											Edit
										</button>
									)}
								</div>
								<div>
									<h2 className="text-lg font-semibold text-gray-800 mb-2">
										About Me
									</h2>
									<p className="text-gray-600">
									{recruiterProfileData?.data
													?.about ??
													"Not specified"}
									</p>
								</div>

								<div>
									<h2 className="text-lg font-semibold text-gray-800 mb-2">
										Email
									</h2>
									<p className="text-gray-600">
									{recruiterProfileData?.data
													?.email ??recruiterData?.email}
									</p>
								</div>

								{recruiterProfileData && (
									<div>
										<h2 className="text-lg font-semibold text-gray-800 mb-2">
											Phone
										</h2>
										<p className="text-gray-600">
										{recruiterProfileData?.data
													?.phone ??recruiterData?.phone}
										</p>
									</div>
								)}

								{!isCandidate && (
									<div>
										<h2 className="text-lg font-semibold text-gray-800 mb-2">
											Gender
										</h2>
										<p className="text-gray-600">
											{recruiterProfileData?.data
												?.gender ?? ""}
										</p>
									</div>
								)}

								<div className="mt-6">
									<h2 className="text-lg font-semibold text-gray-800 mb-2">
										Company details
									</h2>
									<ul>
										<li className="mb-4">
											<h3 className="text-blue-500 font-semibold">
												{recruiterProfileData?.data
													?.company_name ??
													""}
											</h3>
											<p className="text-gray-600">
												{recruiterProfileData?.data
													?.company_location ??
													""}
											</p>
											<p className="text-gray-600">
												{recruiterProfileData?.data
													?.company_state ??
													""}
											</p>
											<p className="text-gray-600">
												{recruiterProfileData?.data
													?.company_country ??
													" "}
											</p>
											<p className="text-gray-600">
												{recruiterProfileData?.data
													?.company_website ??
													""}
											</p>
										</li>
										{/* Add more job postings */}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</main>
				{isCandidate && <Footer />}
			</div>
		</div>
	);
};

export default RecruiterProfilePage;
