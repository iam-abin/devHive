import React from "react";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
// import FooterCandidate from "../../../components/candidate/FooterCandidate";

import { useEffect, useState } from "react";
import { getAllJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Paginate from "../../../components/pagination/Paginate";
import JobCardAllJobs from "../../../components/cards/JobCardAllJobs";
import { formatDate } from "../../../utils/date-format";

function AllJobsPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setpageCount] = useState(1);
	const [jobs, setJobs] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");

	const handlePageChange = async ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	const handleView = async (jobId: string) => {
		console.log("id handle view ", jobId);
		// dispatch(setRecruiterJobId(id))
		navigate(`/candidate/job-details/${jobId}`);
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
			<div className="container mx-auto my-8">
				<div className="mb-4 flex justify-end">
					<input
						type="text"
						placeholder="Search"
						className="px-4 mx-11 py-2 border border-gray-300 rounded-md"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="mx-28">
					{filteredJobs.map(
						(job: any) =>
							job.isActive && (
								<JobCardAllJobs
									job={job}
									handleView={handleView}
									formatDateFn={formatDate}
								/>
							)
					)}
				</div>
				<div>
					<Paginate
						pageCount={pageCount}
						handlePageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default AllJobsPage;
