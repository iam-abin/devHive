import { useEffect, useState } from "react";
import TableComponent from "../../../components/table/TableComponent";
import { notify } from "../../../utils/toastMessage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
	deleteAJobApi,
	getAllRecruiterAddedJobsApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { RootState } from "../../../redux/reducer/reducer";
import { useSelector } from "react-redux";

interface JobInterface {
	id: string;
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

function AllAddedJobs() {
	const navigate = useNavigate();
	const [jobsData, setJobsData] = useState<JobInterface[]>([]);

	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	useEffect(() => {
		(async () => {
			try {
				const response = await getAllRecruiterAddedJobsApi(
					recruiterData?.id
				);
				console.log(
					"in useEffect getAllRecruiterAddedJobsApi jobs",
					response
				);
				setJobsData(response.jobs);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, []);

	const viewJobDetails = async (id: string) => {
		console.log("id handle view ", id);
		// dispatch(setRecruiterId(id))
		navigate(`/recruiter/job-details/${id}`);
	};

	const handleEdit = async (id: string) => {
		console.log("id handle edit ", id);
		navigate(`/recruiter/edit-job-details/${id}`);
	};

	const handleDelete = async (id: string) => {
		Swal.fire({
			title: `Do you want to Delete this Job?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Delete",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const deleteJobResponse = await deleteAJobApi(id);
				if (deleteJobResponse) {
					notify(deleteJobResponse.message, "success");
				}

				// const jobs = jobsData.map((job) => {
				// 	if (job.id === id) {
				// 		return {
				// 			...job,
				// 			isActive: updatedJob.data.isActive,
				// 		};
				// 	}

				// 	return job;
				// });

				setJobsData(deleteJobResponse.data);
			}
		});
	};

	const columns = [
		{
			name: "Title",
			selector: (row: { title: string }) => row.title,
			sortable: true,
		},
		{
			name: "Location",
			selector: (row: { location: string }) => row.location,
			sortable: true,
		},

		{
			name: "View",
			cell: (row: { id: string }) => (
				<button
					onClick={() => {
						viewJobDetails(row.id);
					}}
					className="btn btn-info btn-sm w-24"
				>
					view details
				</button>
			),
		},

		{
			name: "Status",
			cell: (row: { isActive: string }) => (
				<div
					className={`badge ${
						row.isActive
							? "badge badge-success gap-2 w-20"
							: "badge badge-error gap-2 w-20"
					} `}
				>
					{row.isActive ? "active" : "inActive"}
				</div>
			),
		},
		{
			name: "Edit",
			cell: (row: { id: string }) => (
				<button
					onClick={() => {
						handleEdit(row.id);
					}}
					className="btn btn-info btn-sm w-24"
				>
					Edit
				</button>
			),
		},
		{
			name: "Delete",
			cell: (row: { id: string }) => (
				<button
					onClick={() => {
						handleDelete(row.id);
					}}
					className="btn btn-info btn-sm w-24"
				>
					Delete
				</button>
			),
		},
	];

	// const data = []

	return (
		<div>
			<div className="flex items-center justify-center">
				<h1 className="text-3xl font-bold">My Jobs</h1>
			</div>
			<div className="navbar bg-base-100">
				<div className="flex-1">
					<button
						className="btn btn-accent"
						onClick={() => navigate("/recruiter/create-job")}
					>
						{" "}
						+ Create Job
					</button>
				</div>
			</div>
			{jobsData.length > 0 ? (
				<TableComponent columns={columns} data={jobsData} />
			) : (
				<div className="text-center text-7xl my-60 font-bold text-orange-800">
					You haven't added any jobs yet
				</div>
			)}
		</div>
	);
}

export default AllAddedJobs;
