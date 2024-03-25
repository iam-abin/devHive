import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusChangeForm from "../dropDown/StatusChangeForm";
import { changeJobApplicationStatusApi } from "../../axios/apiMethods/jobs-service/jobs";
import { notify } from "../../utils/toastMessage";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/date-functions";
import { formatCurrency } from "../../utils/currency-format";
import { FaFacebookMessenger, FaLock } from "react-icons/fa";
import { RootState } from "../../redux/reducer/reducer";
import { useSelector } from "react-redux";

const JobApplicationDetails: React.FC<{
	jobApplicationDetails: any;
	handleChangeApplicationStatus: any;
}> = ({ jobApplicationDetails }) => {
	const location = useLocation();

	const isRecruiterPage = location.pathname.includes("recruiter");
	const isCandidatePage = location.pathname.includes("candidate");

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const candidateProfileData: any = useSelector(
		(state: RootState) => state.candidateProfile.candidateProfile
	);

	if (isRecruiterPage) {
		// Do something specific for the "recruiter" page
		console.log("This is a recruiter page");
	}
	console.log(
		jobApplicationDetails,
		"in job --recruiter --application details component"
	);

	const navigate = useNavigate();
	const handleViewRecruiter = () => {
		// let isPremiumUser = false;
		if (!candidateProfileData?.isPremiumUser) {
			notify("only premium users can view recruiter profile", "success");
			return;
		}
		console.log("clicked handleViewRecruiter");

		navigate(
			`/candidate/recruiter-profile/${jobApplicationDetails?.jobId?.recruiterId}`
		);
	};

	const handleViewCandidate = () => {
		console.log("clicked handleViewCandidate");

		navigate(
			`/recruiter/candidate-profile/${jobApplicationDetails?.candidateId?.id}`
		);
	};

	const handleChangeStatus = async (applicationStatus: string) => {
		console.log("handleChangeapplicationStatus ", applicationStatus);

		const status = {
			jobApplicationStatus: applicationStatus,
		};

		Swal.fire({
			title: `Do you want to change status to ${applicationStatus}?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Change",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await changeJobApplicationStatusApi(
					jobApplicationDetails?.id,
					status
				);
				console.log("applicationStatus", response);
				notify(response.message, "success");
			}
		});

		// setJobs(allJobs.data);
	};
	return (
		<div>
			<div>
				<div className="container mx-auto my-8 ">
					<div className="max-w-2xl mx-3 md:mx-auto bg-white p-8 rounded-md shadow-md">
						<div className="flex justify-between items-center mb-4">
							<div>
								<h1 className="text-2xl md:text-3xl font-bold mb-4">
									{jobApplicationDetails
										? jobApplicationDetails?.jobId?.title
										: "Loading..."}
								</h1>
								<p className="text-gray-600 mb-4">
									Company:{" "}
									{jobApplicationDetails
										? jobApplicationDetails?.jobId
												?.company_name
										: "Loading..."}
								</p>
								<p className="text-gray-600 mb-4">
									Location:{" "}
									{jobApplicationDetails
										? jobApplicationDetails?.jobId
												?.company_location
										: "Loading..."}
								</p>
							</div>

							<div className="mb-4">
								Posted on :
								<p>
									{jobApplicationDetails
										? formatDate(
												jobApplicationDetails?.jobId
													?.createdAt
										  )
										: "Loading..."}
								</p>
							</div>
						</div>

						{isRecruiterPage && (
							<div className="mb-4">
								<h2 className="text-xl font-semibold mb-2">
									Candidate Details
								</h2>
								<p>
									{jobApplicationDetails
										? jobApplicationDetails?.candidateId
												?.name
										: "Loading..."}
									<br />
									{jobApplicationDetails
										? jobApplicationDetails?.candidateId
												?.email
										: "Loading..."}
									<br />
									<button
										className="btn bg-yellow-200"
										onClick={handleViewCandidate}
									>
										view Candidate
									</button>
								</p>
							</div>
						)}

						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
								Job Description
							</h2>
							<p>
								{jobApplicationDetails
									? jobApplicationDetails?.jobId
											?.job_descriptions
									: "Loading..."}
							</p>
						</div>
						{jobApplicationDetails &&
							jobApplicationDetails?.jobId
								?.experience_required && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Job Status
									</h2>
									<p
										className={`${
											jobApplicationDetails?.jobId
												?.isClosed
												? "text-red-600"
												: "text-green-600"
										}`}
									>
										{jobApplicationDetails?.jobId?.isClosed
											? "No longer accepting applications"
											: "this job is open"}
									</p>
								</div>
							)}
						<div className="mb-4">
							{jobApplicationDetails && (
								<>
									<h2 className="text-xl font-semibold mb-2">
										Skills Required
									</h2>
									<ul className="list-disc pl-5">
										{jobApplicationDetails?.jobId
											?.skills_required ? (
											jobApplicationDetails?.jobId?.skills_required.map(
												(
													skill: string,
													index: number
												) => (
													<li key={index}>{skill}</li>
												)
											)
										) : (
											<li>Loading...</li>
										)}
									</ul>
								</>
							)}
						</div>

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId
								?.education_required && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Education Required
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId
												?.education_required
										}
									</p>
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.recruiterId && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										recruiter
									</h2>
									<p>
										{
											jobApplicationDetails?.recruiterId
												?.name
										}
									</p>
									{isCandidatePage ? (
										<div className="flex gap-4 items-center">
											<button
												className="btn bg-yellow-200"
												onClick={handleViewRecruiter}
											>
												view recruiter
												{!candidateProfileData?.isPremiumUser && (
													<FaLock />
												)}
											</button>

											<span className="text-3xl items-start   w-3/5">
												<FaFacebookMessenger
													onClick={() =>
														navigate(
															`/candidate/chat/${jobApplicationDetails?.recruiterId?.id}` // Add the path to your chat page
														)
													}
													className=" cursor-pointer"
												/>
											</span>
										</div>
									) : (
										""
									)}
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId
								?.experience_required && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Experience required
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId
												?.experience_required
										}
									</p>
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId?.deadline && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Deadline
									</h2>
									<p>
										{formatDate(
											jobApplicationDetails?.jobId
												?.deadline
										)}
										{/* {formatDate(jobApplicationDetails?.jobId?.deadline)} */}
									</p>
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId?.employment_type && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Employment type
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId
												?.employment_type
										}
									</p>
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId
								?.available_position && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Available position
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId
												?.available_position
										}
									</p>
								</div>
							)}

						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
								Salary Range
							</h2>
							<p>
								{jobApplicationDetails
									? formatCurrency(
											jobApplicationDetails?.jobId
												?.salary_min
									  )
									: "Loading..."}{" "}
								-
								{jobApplicationDetails
									? formatCurrency(
											jobApplicationDetails?.jobId
												?.salary_max
									  )
									: "Loading..."}
							</p>
						</div>
						{isRecruiterPage ? (
							<StatusChangeForm
								handleChangeStatus={handleChangeStatus}
								jobApplicationDetails={jobApplicationDetails}
							/>
						) : (
							<div>
								{jobApplicationDetails && (
									<div
										className={`badge ${
											jobApplicationDetails?.applicationStatus ==
											"Applied"
												? "badge badge-accent  gap-2 w-24"
												: jobApplicationDetails?.applicationStatus ==
												  "Shortlisted"
												? "badge badge-success gap-2 w-24"
												: "badge badge-error gap-2 w-24"
										} `}
									>
										{
											jobApplicationDetails?.applicationStatus
										}
									</div>
								)}
							</div>
						)}

						
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobApplicationDetails;
