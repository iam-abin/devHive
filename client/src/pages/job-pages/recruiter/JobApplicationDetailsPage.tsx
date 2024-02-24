import { useEffect, useState } from "react";
import {
	getAJobApplicationApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate, useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";

function JobApplicationDetailsPage() {
	const [jobApplicationDetails, setJobApplicationDetails] =
		useState<any>(null);
	const navigate = useNavigate();
	const { jobApplicationId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				console.log("job application details useEffect jobApplicationId");
				
				if (jobApplicationId) {
					const jobApplication = await getAJobApplicationApi(
						jobApplicationId
					);
					console.log(
						"in job Application details page job is: ",
						jobApplication
					);

					setJobApplicationDetails(jobApplication.data);
				}
			} catch (error) {
				// Handle error, e.g., log it or show an error message to the user
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, [jobApplicationId]);

	const handleEditJob = async (id: string) => {
		console.log("id handle edit ", id);
		navigate(`/recruiter/edit-job-details/${id}`);
	};
	return (
		<div>
			<JobApplicationDetails
				jobApplicationDetails={jobApplicationDetails}
				handleChangeApplicationStatus={undefined}
			/>
		</div>
	);
}

export default JobApplicationDetailsPage;
