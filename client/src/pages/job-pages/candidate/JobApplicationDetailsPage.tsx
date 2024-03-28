import { useEffect, useState } from "react";
import {
	getAJobApi,
	getAJobApplicationApi,
	getAnAppliedJobApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate, useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";

function JobApplicationDetailsPage() {
	const [jobApplicationDetails, setJobApplicationDetails] =
		useState<any>(null);
	const navigate = useNavigate();
	const { jobApplicationId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				
				if (jobApplicationId) {
					const jobApplication = await getAnAppliedJobApi(
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
			<TopNavBarCandidate />
			<JobApplicationDetails
				jobApplicationDetails={jobApplicationDetails}
				handleChangeApplicationStatus={undefined}
			/>
			<Footer />
		</div>
	);
}

export default JobApplicationDetailsPage;
