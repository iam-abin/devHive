// import React from "react";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
// import FooterCandidate from "../../../components/candidate/FooterCandidate";

import { useEffect, useState } from "react";
import { getAllJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Paginate from "../../../components/pagination/Paginate";
// import JobCardAllJobs from "../../../components/cards/JobCardAllJobs";
import Footer from "../../../components/footer/Footer";
import JobCard from "../../../components/cards/JobCard";

function AllJobsPage() {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setpageCount] = useState(1);
	const [jobs, setJobs] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");

	const handlePageChange = async ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	const handleView = async (jobId: string) => {
		// dispatch(setRecruiterJobId(id))
		navigate(`/candidate/job-details/${jobId}`);
	};

	useEffect(() => {
		(async () => {
			const allJobs = await getAllJobsApi(currentPage);
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
			job.company_location
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<TopNavBarCandidate />
			<div className="container mx-auto my-8">
				<div className="mb-4 flex justify-end">
					<input
						type="text"
						placeholder="Search"
						className="px-4 mx-11 py-2 border border-gray-300 rounded-md"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				{filteredJobs.length > 0 ? (
					<>
						<div className="">
							{filteredJobs.map(
								(job: any) =>
										<JobCard
											job={job}
											key={job.id}
											handleViewJob={handleView}
										/>
							)}
						</div>
						<div>
							<Paginate
								pageCount={pageCount}
								handlePageChange={handlePageChange}
							/>
						</div>
					</>
				) : (
					<>
						<div className="flex justify-center items-center h-[39.7vh]">
							<h1 className="font-bold text-3xl">
								No jobs are listed yet
							</h1>
						</div>
					</>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default AllJobsPage;
