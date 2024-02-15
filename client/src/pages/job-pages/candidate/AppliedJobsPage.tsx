import { useEffect, useState } from "react";
import TableComponent from "../../../components/table/TableComponent";
import { useNavigate } from "react-router-dom";
import { getAllCandidateAppliedJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { RootState } from "../../../redux/reducer/reducer";
import { useSelector } from "react-redux";
import JobCard from "../../../components/cards/JobCard";
import JobAppliedCard from "../../../components/cards/JobAppliedCard";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
// import FooterCandidate from "../../../components/candidate/FooterCandidate";
import Paginate from "../../../components/pagination/Paginate";

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

function AppliedJobsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setpageCount] = useState(1);

	const navigate = useNavigate();
	const [appliedJobsData, setAppliedJobsData] = useState<JobInterface[]>([]);

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const handlePageChange = async ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	useEffect(() => {
		(async () => {
			// dispatch(setLoading());
			const response = await getAllCandidateAppliedJobsApi(
				candidateData?.id,
				currentPage
			);
			console.log(
				"in useEffect getAllCandidateAppliedJobsApi jobs",
				response
			);
			setAppliedJobsData(response.data);
			setpageCount(response.totalNumberOfPages);
			// dispatch(setLoaded());
		})();
	}, [currentPage]);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const response = await getAllCandidateAppliedJobsApi(
	// 				candidateData?.id
	// 			);
	// 			console.log(
	// 				"in useEffect getAllCandidateAppliedJobsApi jobs",
	// 				response
	// 			);
	// 			setAppliedJobsData(response.data);
	// 		} catch (error: any) {
	// 			console.error(error);
	// 		}
	// 	})();
	// }, []);

	const viewApplicationDetails = async (jobId: string) => {
		console.log("id handle view ", jobId);
		// dispatch(setRecruiterId(id))
		navigate(`/candidate/application-details/${jobId}`);
	};

	return (
		<div>
			<div className="flex items-center justify-center mt-5 mb-10">
				<h1 className="text-3xl font-bold">My Applied Jobs</h1>
			</div>
			<div className="pb-20">
				{appliedJobsData.length > 0 ? (
					<>
						{appliedJobsData.map((job: any) => (
							<JobAppliedCard
								key={job?.id}
								job={job}
								handleViewJob={viewApplicationDetails}
							/>
						))}

						<Paginate
							pageCount={pageCount}
							handlePageChange={handlePageChange}
						/>
					</>
				) : (
					<div className="mx-40 p-6 bg-transparent rounded-md shadow-md">
						<div className="flex items-center justify-center mb-4">
							<p className="text-black ml-4 text-2xl font-bold">
								No jobs are Applied Yet yet
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AppliedJobsPage;
