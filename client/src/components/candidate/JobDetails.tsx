import { useEffect, useState } from "react";
import { getAJobApi } from "../../api/axios/jobs/jobs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { useNavigate } from "react-router-dom";
import { setRecruiterJobId } from "../../redux/slice/recruiterSlice/recruiterJobIdSlice";

function JobDetails() {
	const [jobDetails, setJobDetails] = useState<any>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const jobId = useSelector((state: RootState) => {
		return state.candidateJobId.jobId;
	});

	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				const job = await getAJobApi(jobId);
				setJobDetails(job.data.data);
			} catch (error) {
				// Handle error, e.g., log it or show an error message to the user
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, [jobId]);

	const handleApply = async (id: string) => {
		console.log("id handle edit ", id);
		dispatch(setRecruiterJobId(id));
		// navigate("/recruiter/edit-job-details");
	};

	console.log(jobDetails, "in job details component");

	return (
		<div>
			<div className="container mx-auto my-8">
				<div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
					<div className="flex justify-between items-center mb-4">
						<div>
							<h1 className="text-3xl font-bold mb-4">
								{jobDetails ? jobDetails.title : "Loading..."}
							</h1>
							<p className="text-gray-600 mb-4">
								Company:{" "}
								{jobDetails ? jobDetails.company : "Loading..."}
							</p>
							<p className="text-gray-600 mb-4">
								Location:{" "}
								{jobDetails
									? jobDetails.location
									: "Loading..."}
							</p>
						</div>

						<div className="mb-4">
							Posted on :
							<p>
								{jobDetails
									? new Date(
											jobDetails.createdAt
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
							{jobDetails
								? jobDetails.job_descriptions
								: "Loading..."}
						</p>
					</div>

					<div className="mb-4">
						{jobDetails && (
							<>
								<h2 className="text-xl font-semibold mb-2">
									Skills Required
								</h2>
								<ul className="list-disc pl-5">
									{jobDetails.skills_required ? (
										jobDetails.skills_required.map(
											(skill: string, index: number) => (
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

				

          {jobDetails && jobDetails.education_required && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
							Education Required
							</h2>
							<p>{jobDetails.education_required}</p>
						</div>
					)}

          {jobDetails && jobDetails.recruiter && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
							Recruiter
							</h2>
							<p>{jobDetails.recruiter}</p>
						</div>
					)}

					
          {jobDetails && jobDetails.experience_required && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
              Experience required
							</h2>
							<p>{jobDetails.experience_required}</p>
						</div>
					)}

          {jobDetails && jobDetails.deadline && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
              Deadline
							</h2>
							<p>{jobDetails.deadline}</p>
						</div>
					)}


					{jobDetails && jobDetails.employment_type && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
								Employment type
							</h2>
							<p>{jobDetails.employment_type}</p>
						</div>
					)}

					{jobDetails && jobDetails.available_position && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold mb-2">
							Available position
							</h2>
							<p>{jobDetails.available_position}</p>
						</div>
					)}

					<div className="mb-4">
						<h2 className="text-xl font-semibold mb-2">
							Salary Range
						</h2>
						<p>
							₹{jobDetails ? jobDetails.salary_min : "Loading..."}{" "}
							- ₹
							{jobDetails ? jobDetails.salary_max : "Loading..."}
						</p>
					</div>

					<div>
						<button
							className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
							onClick={() => {
								console.log(
									"onclick handle submit jobDetails ",
									jobDetails.id
								);

								return handleApply(jobDetails?.id);
							}}
						>
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobDetails;
