import React, { useEffect, useState } from "react";
import AdminViewJobDetailsCard from "../../../components/cards/AdminViewJobDetailsCard";
import { useParams } from "react-router-dom";
import {
	blockUnblockJobApi,
	viewJobDetailsApi,
} from "../../../axios/apiMethods/admin-service/job";
import Swal from "sweetalert2";
import { notify } from "../../../utils/toastMessage";

const ViewJobDetailsPage: React.FC = () => {
	const { jobId } = useParams();

	interface JobInterface {
		id: string;
		jobId: string;
		title: string;
		recruiter: string;
		company: string;
		jobDescription?: string;
		skills?: string | string[];
		availablePosition?: string;
		experienceRequired?: string;
		educationRequired?: string;
		location?: string;
		employmentType?: string;
		salaryMin?: number;
		salaryMax?: number;
		has_applied?: boolean;
		isActive?: boolean;
		deadline?: Date;
	}

	const [jobDetails, setJobDetails] = useState<JobInterface | Object>({});

	useEffect(() => {
		(async () => {
			try {
				const job = await viewJobDetailsApi(jobId);
				setJobDetails(job.data);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, [jobId]);

	const handleBlockUnblock = async (jobId: string, isActive: boolean) => {
		Swal.fire({
			title: `Do you want to ${isActive ? "block" : "unblock"} this Job?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Block",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const updatedJob = await blockUnblockJobApi(jobId);
				if (updatedJob) {
					notify(updatedJob.message, "success");
				}

				setJobDetails(updatedJob);
			}
		});
	};

	return (
		<AdminViewJobDetailsCard
			data={jobDetails}
			handleBlockUnblock={handleBlockUnblock}
		/>
	);
};

export default ViewJobDetailsPage;
