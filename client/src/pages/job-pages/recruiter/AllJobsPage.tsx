import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import JobCard from "../../../components/cards/JobCard";
import Paginate from "../../../components/pagination/Paginate";

function AllJobsPage() {
	const dispatch = useDispatch();

	// const candidateData = useSelector(
	// 	(state: RootState) => state.candidateData.candidate
	// );

	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setpageCount] = useState(1);
	const [jobs, setJobs] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");
	
	const handlePageChange = async ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	const handleViewJob = async (jobId: string) => {
		console.log("id handle view ", jobId);
		// dispatch(setRecruiterJobId(id))
		navigate(`/recruiter/job-details/${jobId}`);
	};

	useEffect(() => {
		(async () => {
			const allJobs = await getAllJobsApi(currentPage);
			console.log("allJobs", allJobs);
			setJobs(allJobs.data);
			setpageCount(allJobs.totalNumberOfPages);
		})();
	}, [currentPage]);

	const filteredJobs = jobs.filter(
		(job: any) =>
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.employment_type
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			job.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<div>
				<div className="navbar">
					<div className="flex-1">
						<button
							className="btn btn-accent"
							onClick={() => navigate("/recruiter/create-job")}
						>
							{" "}
							+ Create Job
						</button>
					</div>
					
						<div className="flex-none gap-2 mb-5">
							<div className="form-control">
								<input
									type="text"
									placeholder="Search"
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className="input input-bordered w-24 md:w-auto"
								/>
							</div>
						</div>
					
				</div>
				{filteredJobs.length <= 0 && (
					<div className="flex justify-center items-center h-[39.7vh]">
						<h1 className="font-bold text-3xl">
							No jobs are listed yet
						</h1>
					</div>
				)}

				<div className="flex flex-col w-full">
					{filteredJobs.map((job: any) => {
						return (
							job.isActive && (
								<JobCard
									job={job}
									key={job.id}
									handleViewJob={handleViewJob}
								/>
							)
						);
					})}
				</div>
			</div>
			{filteredJobs.length > 0 && (
				<Paginate
					pageCount={pageCount}
					handlePageChange={handlePageChange}
				/>
			)}
		</div>
	);
}

export default AllJobsPage;
