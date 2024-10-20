
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import { useEffect, useState } from "react";
import { getAllJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import Paginate from "../../../components/pagination/Paginate";
import Footer from "../../../components/footer/Footer";
import JobCard from "../../../components/cards/JobCard";

function AllJobsPage() {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setpageCount] = useState(1);
	const [jobs, setJobs] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");

	const handlePageChange = async ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	const handleView = async (jobId: string) => {
		navigate(`/candidate/job-details/${jobId}`);
	};

	useEffect(() => {
		(async () => {
			const allJobs = await getAllJobsApi(currentPage);
			setJobs(allJobs.data.jobs);
			setpageCount(allJobs.data.totalNumberOfPages);
		})();
	}, [currentPage]);

	const filteredJobs = jobs.filter(
		(job: any) =>
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.employmentType
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			job.companyLocation
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
