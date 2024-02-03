import React from "react";


const JobCardAllJobs: React.FC<{ job: any; handleView: any, formatDateFn: any }> = ({
	job,
	handleView,
  formatDateFn
}) => {
	return (
		<div
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
					Created on {formatDateFn(job.createdAt)}
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
	);
};

export default JobCardAllJobs;
