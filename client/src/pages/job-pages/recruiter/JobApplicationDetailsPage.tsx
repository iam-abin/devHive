import { useEffect, useState } from "react";
import {
	getAJobApplicationApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate, useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";

function JobApplicationDetailsPage() {
	const [jobApplicationDetails, setJobApplicationDetails] =
		useState<any>(null);
		
	const { jobApplicationId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				
				if (jobApplicationId) {
					const jobApplication = await getAJobApplicationApi(
						jobApplicationId
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
