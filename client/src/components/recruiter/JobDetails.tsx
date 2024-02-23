import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { RootState } from "../../redux/reducer/reducer";
import { formatDate } from "../../utils/date-format";
import { FaFacebookMessenger } from "react-icons/fa";
import { BsFillBagDashFill, BsFillBagFill } from "react-icons/bs";

const JobDetails: React.FC<{
	jobDetails: any;
	handleEditJob?: any;
	handleApplyJob?: any;
	handleGoBack?: any;
}> = ({ jobDetails, handleEditJob, handleApplyJob, handleGoBack }) => {
	console.log("jobDetails in JobDetails component:", jobDetails);
	const location = useLocation();
	const navigate = useNavigate();

	const isRecruiterPage = location.pathname.includes("recruiter");
	const isCandidatePage = location.pathname.includes("candidate");

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	if (isRecruiterPage) {
		// Do something specific for the "recruiter" page
		console.log("This is a recruiter page");
	}
	console.log(jobDetails, "in job details component");

	return (
		<div>
			<div className="container mx-auto my-8">
				<div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
					<div className="flex justify-between items-center my-8  mb-4">
						<h1 className="text-3xl font-bold mb-4 flex gap-2">
							<BsFillBagDashFill />
							{jobDetails ? jobDetails.title : "Loading..."}
						</h1>
						<div className="mb-4 flex gap-2 items-center my-8 ">
							<CiCalendarDate /> <p>Posted on:</p>
							<p>
								{jobDetails
									? formatDate(jobDetails.createdAt)
									: "Loading..."}
							</p>
						</div>
					</div>
					<div className=" mb-4 flex items-center my-8 ">
						<p className="w-3/5 font-extrabold">Company: </p>
						<span className=" w-3/5">
							{jobDetails
								? jobDetails.company_name
								: "Loading..."}
						</span>
					</div>
					<div className=" mb-4 flex items-center my-8 ">
						<p className="w-3/5 font-extrabold">Location: </p>
						<span className=" w-3/5">
							{jobDetails
								? jobDetails.company_location
								: "Loading..."}
						</span>
					</div>

					<div className="mb-4 flex items-center my-8   ">
						<h2 className=" font-extrabold w-3/5  mb-2">
							Job Description
						</h2>
						<p className="w-3/5">
							{jobDetails
								? jobDetails.job_descriptions
								: "Loading..."}
						</p>
					</div>

					<div className="mb-4 flex items-center my-8  ">
						{jobDetails && (
							<>
								<h2 className=" font-extrabold mb-2  w-3/5">
									Skills Required
								</h2>
								<ul className="w-3/5">
									{jobDetails.skills_required ? (
										jobDetails.skills_required.map(
											(skill: string, index: number) => (
												<div
													key={skill}
													className="badge text-white bg-sky-700 p-4 flex flex-row gap-2"
												>
													<li>{skill}</li>
													
												</div>

												// ===============
											)
										)
									) : (
										<li>Loading...</li>
									)}
								</ul>
							</>
						)}
					</div>

					{jobDetails && jobDetails.education_required && (
						<div className="mb-4 flex items-center my-8 ">
							<h2 className=" font-extrabold mb-2  w-3/5">
								Education Required
							</h2>
							<p className=" w-3/5">
								{jobDetails.education_required}
							</p>
						</div>
					)}

					{/* {jobDetails && jobDetails.recruiterId && (
						<div className="mb-4">
							<h2 className=" font-extrabold mb-2">
								recruiter
							</h2>
							<p>{jobDetails.recruiterId}</p>
						</div>
					)} */}
					{/* <div className="my-3 "> */}
					{jobDetails && jobDetails.recruiterId && (
						<div className="flex items-center my-8 ">
							<h2 className=" font-extrabold mb-2  w-3/5">
								Recruiter
							</h2>
							<div className="mb-3  w-3/5">
								<p>{jobDetails.recruiterId.name}</p>{" "}
							</div>
						</div>
					)}

					{isCandidatePage && (
						<div className="flex items-center my-8 ">
							<p className="  w-3/5 my-4 font-extrabold">
								Send Message:{" "}
							</p>{" "}
							<span className="text-3xl items-start   w-3/5">
								<FaFacebookMessenger
									onClick={() =>
										navigate(
											`/candidate/chat/${jobDetails?.recruiterId?.id}` // Add the path to your chat page
										)
									}
									className=" cursor-pointer"
								/>
							</span>
						</div>
					)}
					{/* </div> */}

					{jobDetails && jobDetails.experience_required && (
						<div className="mb-4 flex items-center my-8 ">
							<h2 className="  w-3/5 font-extrabold mb-2">
								Experience required
							</h2>
							<p className=" w-3/5">
								{jobDetails.experience_required}
							</p>
						</div>
					)}

					{jobDetails && jobDetails.deadline && (
						<div className="mb-4 flex items-center my-8 ">
							<h2 className=" font-extrabold mb-2  w-3/5">
								Deadline
							</h2>
							<p className=" w-3/5">
								{formatDate(jobDetails.deadline)}
							</p>
						</div>
					)}

					{jobDetails && jobDetails.employment_type && (
						<div className="mb-4 flex items-center my-8 ">
							<h2 className=" font-extrabold mb-2  w-3/5">
								Employment type
							</h2>
							<p className=" w-3/5">
								{jobDetails.employment_type}
							</p>
						</div>
					)}

					{jobDetails && jobDetails.available_position && (
						<div className="mb-4 flex items-center my-8 ">
							<h2 className=" font-extrabold mb-2  w-3/5">
								Available position
							</h2>
							<p className=" w-3/5">
								{jobDetails.available_position}
							</p>
						</div>
					)}

					<div className="mb-4 flex items-center my-8 ">
						<h2 className=" font-extrabold mb-2  w-3/5">
							Salary Range
						</h2>
						<p className=" w-3/5">
							₹{jobDetails ? jobDetails.salary_min : "Loading..."}{" "}
							- ₹
							{jobDetails ? jobDetails.salary_max : "Loading..."}
						</p>
					</div>

					<div>
						{isRecruiterPage ? (
							<button
								className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
								onClick={() => {
									console.log(
										"onclick handle submit jobDetails ",
										jobDetails.id
									);

									return handleEditJob(jobDetails?.id);
								}}
							>
								Edit
							</button>
						) : isCandidatePage ? (
							<button
								className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
								onClick={() => {
									console.log(
										"onclick handle apply ",
										jobDetails.id
									);

									return handleApplyJob(
										jobDetails?.id,
										candidateData.id,
										jobDetails?.recruiterId
									);
								}}
							>
								Apply Now
							</button>
						) : (
							<button
								className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
								onClick={() => {
									console.log(
										"onclick handle apply ",
										jobDetails.id
									);

									return handleGoBack(jobDetails?.id);
								}}
							>
								Go back
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobDetails;
