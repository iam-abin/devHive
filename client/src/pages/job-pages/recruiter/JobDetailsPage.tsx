import { useEffect, useState } from "react";
import {
	changeJobCloseStatusApi,
	getAJobApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate, useParams } from "react-router-dom";
import JobDetails from "../../../components/recruiter/JobDetails";
import Swal from "sweetalert2";
import { notify } from "../../../utils/toastMessage";

function JobDetailsPage() {
	const [jobDetails, setJobDetails] = useState<any>(null);
	const navigate = useNavigate();
	const { jobId } = useParams();
	useEffect(() => {
		const fetchJobDetails = async () => {
				if (jobId) {
					const job = await getAJobApi(jobId);
					
					setJobDetails(job.data);
				}
		};

		fetchJobDetails();
	}, [jobId]);

	const handleEditJob = async (id: string) => {
		
		navigate(`/recruiter/edit-job-details/${id}`);
	};

	const handleChangeJobCloseStatus = async (jobId: string) => {
		
			if (jobId) {
				Swal.fire({
					title: `Do you want to ${
						jobDetails?.isActive ? "open" : "close"
					} this Job?`,
					text: "Are you sure!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: `Yes, ${
						jobDetails?.isActive ? "open job" : "close job"
					}`,
				}).then(async (result) => {
					if (result.isConfirmed) {
						const job = await changeJobCloseStatusApi(jobId);
						if (job) {
							
							setJobDetails({
								...jobDetails,
								isActive: job.data.isActive,
							});

							notify(job.message, "success");
						}
					}
				});
			}
	};

	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<div>
			<JobDetails
				jobDetails={jobDetails}
				handleEditJob={handleEditJob}
				handleChangeJobCloseStatus={handleChangeJobCloseStatus}
				handleGoBack={handleGoBack}
			/>
		</div>
	);
}

export default JobDetailsPage;
