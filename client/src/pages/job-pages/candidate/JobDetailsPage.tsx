import { useEffect, useState } from "react";
import {
	candidateApplyJobApi,
	getAJobApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { useParams } from "react-router-dom";
import JobDetails from "../../../components/recruiter/JobDetails";
import Swal from "sweetalert2";
import { notify } from "../../../utils/toastMessage";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";

function JobDetailsPage() {
	const [jobDetails, setJobDetails] = useState<any>(null);
	const { jobId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				if (jobId) {
					const job = await getAJobApi(jobId);
					
					setJobDetails(job.data);
				}
			
		};

		fetchJobDetails();
	}, [jobId]);

	const handleApplyJob = async (jobId: string) => {

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
					const response = await candidateApplyJobApi(jobId);
					
					if (response) {
						notify("Applied successfully", "success");
						// navigate("/candidate/signin");
					}
				}
			})
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
