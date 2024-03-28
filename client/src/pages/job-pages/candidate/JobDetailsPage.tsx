import { useEffect, useState } from "react";
import {
	candidateApplyJobApi,
	getAJobApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import JobDetails from "../../../components/recruiter/JobDetails";
import Swal from "sweetalert2";
import { notify } from "../../../utils/toastMessage";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";
// import FooterCandidate from "../../../components/candidate/FooterCandidate";

function JobDetailsPage() {
	const [jobDetails, setJobDetails] = useState<any>(null);
	// const navigate = useNavigate();
	const { jobId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				if (jobId) {
					const job = await getAJobApi(jobId);
					
					setJobDetails(job.data);
				}
			} catch (error) {
				// Handle error, e.g., log it or show an error message to the user
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, [jobId]);

	const handleApplyJob = async (
		jobId: string,
		candidateId: string,
		recruiterId: string
	) => {
		
		// navigate("/candidate/edit-job-details");
		const jobApplicationData = {
			jobId,
			candidateId,
			recruiterId,
		};

		Swal.fire({
			title: "Do you want to Apply For this job?",
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Apply",
		})
			.then(async (result) => {
				if (result.isConfirmed) {
					const response = await candidateApplyJobApi(
						jobApplicationData
					);
					
					if (response) {
						notify("Applied successfully", "success");
						// navigate("/candidate/signin");
					}
				}
			})
			.catch((error) => {
				// console.error(error.response.data.errors[0].message);

				notify(
					error.response.data.errors[0].message ||
						"You already applied for this jobb",
					"error"
				);
			});
	};
	return (
		<div>
			<TopNavBarCandidate />
			<JobDetails
				jobDetails={jobDetails}
				handleApplyJob={handleApplyJob}
			/>
			<Footer />
		</div>
	);
}

export default JobDetailsPage;
