import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewJobDetailsApi } from "../../api/axios/admin/job";

function ViewJobDetails() {
	const { jobId } = useParams();

	interface JobInterface {
		id: string;
		jobId: string;
		title: string;
		recruiter: string;
		company: string;
		job_descriptions?: string;
		skills_required?: string | string[];
		available_position?: string;
		experience_required?: string;
		education_required?: string;
		location?: string;
		employment_type?: string;
		salary_min?: number;
		salary_max?: number;
		has_applied?: boolean;
		isActive?: boolean;
		deadline?: Date;
	}

	const [jobDetails, setJobDetails] = useState<JobInterface | null>(null);

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				console.log("fetching job details");

				const job = await viewJobDetailsApi(jobId);
				console.log("all jobs are : ", job);
				console.log("all jobs are : ", job.data);

				setJobDetails(job.data.data);
			} catch (error) {
				console.error("Error fetching profile details:", error);
			}
		};

		fetchProfileDetails();
	}, [jobId]);

  const handleBlockUnblock = () => {
    // Implement your logic to block or unblock the job
    // For example, you can make an API call to update the job status
  };

	return (
		<div className="container mx-auto mt-8">
			<div className="bg-white p-8 rounded-lg shadow-md">
				{jobDetails ? (
					<>
						<h2 className="text-3xl font-bold mb-4">
							{jobDetails.title}
						</h2>
						{/* <p className="text-gray-600 mb-4">
              {jobDetails.recruiter} at {jobDetails.company}
            </p> */}
						<div className="mb-4">
							<span className="font-semibold">Job ID:</span>{" "}
							{jobDetails.jobId}
						</div>
						<div className="mb-4">
							<span className="font-semibold">Location:</span>{" "}
							{jobDetails.location}
						</div>
						<div className="mb-4">
							<span className="font-semibold">
								Employment Type:
							</span>{" "}
							{jobDetails.employment_type}
						</div>
						<div className="mb-4">
							<span className="font-semibold">Salary:</span>{" "}
							{`₹${jobDetails.salary_min} - ₹${jobDetails.salary_max}`}
						</div>
						{/* <div className="mb-4">
							<span className="font-semibold">Deadline:</span>{" "}
							{jobDetails.deadline
								? new Date(
										jobDetails.deadline
								  ).toLocaleDateString()
								: "N/A"}
						</div> */}
						<div className="mb-4">
							<span className="font-semibold">
								Job description:
							</span>{" "}
							<p className="mb-4">
								{jobDetails.job_descriptions}
							</p>
						</div>
						<div className="mb-4">
							<span className="font-semibold">
								Skills Required:
							</span>{" "}
							{Array.isArray(jobDetails.skills_required)
								? jobDetails.skills_required.join(", ")
								: jobDetails.skills_required}
						</div>
						<div className="mb-4">
							<span className="font-semibold">
								Active Status:
							</span>{" "}
							{jobDetails.isActive ? (
								<span className="text-green-600">Active</span>
							) : (
								<span className="text-red-600">Inactive</span>
							)}
						</div>
						<div className="mb-4">
              <button
                onClick={handleBlockUnblock}
                className={`${
                  jobDetails.isActive
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                } px-4 py-2 rounded-md`}
              >
                {jobDetails.isActive ? "Block" : "Unblock"}
              </button>
            </div>
					</>
				) : (
					<div className="text-red-500">No Job data found</div>
				)}
			</div>
		</div>
	);
}

export default ViewJobDetails;
