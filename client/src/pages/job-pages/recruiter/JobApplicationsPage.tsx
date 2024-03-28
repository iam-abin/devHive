import { useEffect, useState } from "react";
import TableComponent from "../../../components/table/TableComponent";
import { notify } from "../../../utils/toastMessage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
	getAllJobsApplicationsForRecruiterApi
} from "../../../axios/apiMethods/jobs-service/jobs";
import { RootState } from "../../../redux/reducer/reducer";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/date-functions";

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

function JobApplicationsPage() {
	const navigate = useNavigate();
	const [jobsApplicationsData, setJobApplicationsData] = useState<JobInterface[]>([]);

	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	useEffect(() => {
		(async () => {
			try {
				const response = await getAllJobsApplicationsForRecruiterApi(
					recruiterData?.id
				);
				
				setJobApplicationsData(response.data);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, []);

	const viewApplicationDetails = async (jobId: string) => {
		// dispatch(setRecruiterId(id))
		navigate(`/recruiter/application-details/${jobId}`);
	};

	

	const columns = [
		{
			name: "Candidate",
			selector: (row?: {candidateId?: {name: string}} ) => row?.candidateId?.name,
			sortable: true,
		},
		{
			name: "Job Title",
			selector: (row?: {jobId?:{title: string} }) => row?.jobId?.title,
			sortable: true,
		},
		{
			name: "Application Status",
			cell: (row: { applicationStatus: string }) => (
				<div
					className={`badge ${
						row?.applicationStatus == "Applied"
							? "badge badge-accent  gap-2 w-24"
							:row.applicationStatus == "Shortlisted"? "badge badge-success gap-2 w-24" :   "badge badge-error gap-2 w-24"
					} `}
				>
					{row?.applicationStatus}
				</div>
			),
		},
		{
			name: "Applied on",
			selector: (row?: { createdAt: string }) => formatDate(row?.createdAt!) ,
			sortable: true,
		},
		{
			name: "View",
			cell: (row: {id: string}) => (
				<button
					onClick={() => {
						viewApplicationDetails(row.id);
					}}
					className="btn btn-info btn-sm w-24"
				>
					view details
				</button>
			),
		},
	];

	return (
		<div>
			<div className="flex items-center justify-center">
				<h1 className="text-3xl font-bold">Job Applicants</h1>
			</div>
			
			{jobsApplicationsData.length > 0 ? (
				<div className="mx-14">
					<TableComponent columns={columns} data={jobsApplicationsData} />
				</div>
			) : (
				<div className="text-center text-7xl my-60 font-bold text-orange-800">
					You haven't got any job applications yet
				</div>
			)}
		</div>
	);
}

export default JobApplicationsPage;
