import React from "react";

const JobCardAllJobs: React.FC<{
	job: any;
	handleView: any;
	formatDateFn: any;
}> = ({ job, handleView, formatDateFn }) => {
	return (
		<div key={job.id} className="mx-4 md:mx-40 pb-4">
    <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103">
        <div className="flex flex-col items-start gap-3 py-3">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-8">
                <span className="flex items-center gap-1">
                    {job.employmentType}
                </span>
                <span className="flex items-center gap-1">
                    {job.location}
                </span>
                <span className="flex items-center gap-1">
                    {job.salaryMax}
                </span>
                <span className="text-gray-500 text-sm">
                    Created on {formatDateFn(job.createdAt)}
                </span>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button
                onClick={() => handleView(job.id)}
                className="text-blue-500 border border-blue-500 px-6 py-2 rounded-md hover:bg-sky-500 hover:text-white"
            >
                View Details
            </button>
        </div>
    </div>
</div>
	);
};

export default JobCardAllJobs;
