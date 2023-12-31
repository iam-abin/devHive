import { useEffect, useState } from "react";
import { getAllJobsApi } from "../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCandidateJobId } from "../../redux/slice/candidateSlice/candidateJobIdSlice";

function AllJob() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [jobs, setJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const handleView = async (id: string) => {
		dispatch(setCandidateJobId(id));
		navigate("/candidate/job-details");
	};

	useEffect(() => {
		(async () => {
			const allJobs = await getAllJobsApi();
			setJobs(allJobs.data.data);
		})();
	}, []);

	const filteredJobs = jobs.filter(
		(job: any) =>
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.employment_type
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			job.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto my-8">
			<div className="mb-4 flex justify-end">
				<input
					type="text"
					placeholder="Search"
					className="px-4 py-2 border border-gray-300 rounded-md"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			{filteredJobs.map((job: any) => (
				job.isActive && <div
        key={job.id}
        className="bg-white p-6 rounded-md shadow-md mb-4 cursor-pointer transition-transform transform hover:scale-101"
      >
        <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
        <div className="flex flex-wrap items-center mb-4">
          <span className="text-gray-500 text-sm mr-4">
            {job.employment_type}
          </span>
          <span className="text-gray-500 text-sm mr-4">
            {job.location}
          </span>
          <span className="text-gray-500 text-sm mr-4">
            {job.salary_max}
          </span>
          <span className="text-gray-500 text-sm">
            Created on{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handleView(job.id)}
            className="text-blue-500 hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
			))}
		</div>
	);
}

export default AllJob;
