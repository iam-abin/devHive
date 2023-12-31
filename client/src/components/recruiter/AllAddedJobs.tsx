import { useEffect, useState } from "react";
// import { getAllJobsApi, getAllRecruiterAddedJobsApi } from "../../axios/admin2/jobs/jobs";
import { getAllRecruiterAddedJobsApi, getAllJobsApi } from "../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRecruiterJobId } from "../../redux/slice/recruiterSlice/recruiterJobIdSlice";
import { RootState } from "../../redux/reducer/reducer";

function AllAddedJobs() {
	const dispatch = useDispatch();

	const recruiterData = useSelector(
		(state: RootState) => state.recruiterData.recruiter
	);

	const navigate = useNavigate();
	const [jobs, setJobs] = useState([]);

	const handleEdit = async (id: string) => {
		console.log("id handle edit ", id);
		dispatch(setRecruiterJobId(id));
		navigate("/recruiter/edit-job-details");
	};

	const handleView = async (id: string) => {
		console.log("id handle view ", id);
		dispatch(setRecruiterJobId(id));
		navigate("/recruiter/job-details");
	};

	useEffect(() => {
		(async () => {
			const allRecruiterAddedJobs = await getAllRecruiterAddedJobsApi(recruiterData.id);
			// const allRecruiterAddedJobs = await getAllJobsApi();
            // console.log("----------------------");
            
            // console.log("allRecruiterAddedJobs",allRecruiterAddedJobs.data.jobs);
			// const allRecruiterAddedJobs = await getAllJobsApi();
            // console.log("----------------------");
            
            // console.log("allRecruiterAddedJobs",allRecruiterAddedJobs.data.jobs);
            
            
			setJobs(allRecruiterAddedJobs.data.jobs);
		})();
	}, []);
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
				<div className="flex-none gap-2">
					<div className="form-control">
						<input
							type="text"
							placeholder="Search"
							className="input input-bordered w-24 md:w-auto"
						/>
					</div>
				</div>
			</div>
            {jobs.length>0?<div className="flex flex-col w-full">
				{jobs.map((job: any) => {
					return (
						<div
							className="grid h-20 py-2 px-5 card bg-base-300 rounded-box items-center mb-2 "
							key={job.id}
						>
							<div className="flex flex-row justify-between">
								<div>
									<div className="text-2xl font-bold">
										{job.title}
									</div>
									<div className="flex gap-5 mt-1">
										<span className="text-gray-500 text-sm font-normal">
											{job.employment_type}
										</span>

										<span className="text-gray-500 text-sm font-normal">
											{job.location}
										</span>

										<span className="text-gray-500 text-sm font-normal">
											{job.salary_max}
										</span>

										<span className="text-gray-500 text-sm font-normal">
											Created on{" "}
											{new Date(
												job.createdAt
											).toLocaleDateString()}
										</span>
									</div>
								</div>
								<div>
									<button
										onClick={() => handleEdit(job.id)}
										className="btn btn-outline ml-3"
									>
										Edit
									</button>
									<button
										onClick={() => handleView(job.id)}
										className="btn btn-outline ml-3"
									>
										View
									</button>
									<button className="btn btn-error ml-3">
										Delete
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>:<div className="text-center text-7xl my-60 font-bold text-orange-800">You haven't added any jobs yet</div>}	
		</div>
	);
}

export default AllAddedJobs;
