import { useEffect, useState } from "react";
import { getAJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
// import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import JobDetails from "../../../components/recruiter/JobDetails";

function JobDetailsPage() {
	const [jobDetails, setJobDetails] = useState<any>(null);
	const navigate = useNavigate();
	const { jobId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				if (jobId) {
					const job = await getAJobApi(jobId);
					console.log("in job details page job is: ", job);

					setJobDetails(job.data);
				}
			} catch (error) {
				// Handle error, e.g., log it or show an error message to the user
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, [jobId]);

	const handleEditJob = async (id: string) => {
		console.log("id handle edit ", id);
		navigate(`/recruiter/edit-job-details/${id}`);
	};
	return (
		<div>
			<JobDetails jobDetails={jobDetails} handleEditJob={handleEditJob} />
		</div>
	);
}

export default JobDetailsPage;
