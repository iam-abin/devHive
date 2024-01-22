import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer/reducer";
import StatusChangeForm from "../dropDown/StatusChangeForm";
import { changeJobApplicationStatusApi } from "../../axios/apiMethods/jobs-service/jobs";
import { notify } from "../../utils/toastMessage";
import Swal from "sweetalert2";

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

	if (isRecruiterPage) {
		// Do something specific for the "recruiter" page
		console.log("This is a recruiter page");
	}
	console.log(jobApplicationDetails, "in job --recruiter --application details component");

	const navigate = useNavigate()
	const handleViewRecruiter = ()=>{
		console.log("clicked ha");
		
		navigate('/candidate/recruiter-profile')
	}

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
				<div className="container mx-auto my-8">
					<div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
						<div className="flex justify-between items-center mb-4">
							<div>
								<h1 className="text-3xl font-bold mb-4">
									{jobApplicationDetails
										? jobApplicationDetails?.jobId?.title
										: "Loading..."}
								</h1>
								<p className="text-gray-600 mb-4">
									Company:{" "}
									{jobApplicationDetails
										? jobApplicationDetails?.jobId?.company
										: "Loading..."}
								</p>
								<p className="text-gray-600 mb-4">
									Location:{" "}
									{jobApplicationDetails
										? jobApplicationDetails?.jobId?.location
										: "Loading..."}
								</p>
							</div>

							<div className="mb-4">
								Posted on :
								<p>
									{jobApplicationDetails
										? new Date(
												jobApplicationDetails?.jobId?.createdAt
										  ).toLocaleDateString()
										: "Loading..."}
								</p>
							</div>
						</div>

						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
								Job Description
							</h2>
							<p>
								{jobApplicationDetails
									? jobApplicationDetails?.jobId?.job_descriptions
									: "Loading..."}
							</p>
						</div>

						<div className="mb-4">
							{jobApplicationDetails && (
								<>
									<h2 className="text-xl font-semibold mb-2">
										Skills Required
									</h2>
									<ul className="list-disc pl-5">
										{jobApplicationDetails?.jobId?.skills_required ? (
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
							jobApplicationDetails?.jobId?.education_required && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Education Required
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId?.education_required
										}
									</p>
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId?.recruiterId && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										recruiter
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId?.recruiterId
										}
									</p>
									{isCandidatePage?<button className="btn bg-yellow-200" onClick={handleViewRecruiter}>view recruiter</button>:""}
									
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId?.experience_required && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Experience required
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId?.experience_required
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
										{jobApplicationDetails?.jobId?.deadline}
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
											jobApplicationDetails?.jobId?.employment_type
										}
									</p>
								</div>
							)}

						{jobApplicationDetails &&
							jobApplicationDetails?.jobId?.available_position && (
								<div className="mb-4">
									<h2 className="text-xl font-semibold mb-2">
										Available position
									</h2>
									<p>
										{
											jobApplicationDetails?.jobId?.available_position
										}
									</p>
								</div>
							)}

						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
								Salary Range
							</h2>
							<p>
								₹
								{jobApplicationDetails
									? jobApplicationDetails?.jobId?.salary_min
									: "Loading..."}{" "}
								- ₹
								{jobApplicationDetails
									? jobApplicationDetails?.jobId?.salary_max
									: "Loading..."}
							</p>
						</div>
						{isRecruiterPage ? (
							<StatusChangeForm
								handleChangeStatus={handleChangeStatus}
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
									>{jobApplicationDetails?.applicationStatus}</div>
								) }
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobApplicationDetails;
