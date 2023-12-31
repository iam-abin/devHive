// landing job card
import React from "react";
import dayjs from "dayjs";

function JobCard({ job, handleViewJob }: { job: any, handleViewJob: any }) {
	// const props = { skills: ["js", "nodehs"] };
	const date1 = dayjs(Date.now());
	const diffInDays = date1.diff(job.createdAt, "day");
	return (
		<div className="mx-40 pb-4" key={job.id}>
			<div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103">
				<div className="flex flex-col items-start gap-3">
					<h1 className="text-lg font-semibold">{job?.title}</h1>
					<p>{job?.employment_type} &#x2022; {job?.location}</p>
					<div className="flex items-center gap-2">
						{job.skills_required.map((skill: string, i: number) => (
							<p
								key={i}
								className="text-gray-500 py-1 px-2 rounded-md border border-black"
							>
								{skill}
							</p>
						))}
					</div>
				</div>
				<div className="flex items-center gap-4">
					<p className="text-gray-500">
						Posted{" "}
						{diffInDays > 1
							? `${diffInDays} days`
							: `${diffInDays} day`}{" "}
						ago
					</p>

					<button
						onClick={() => handleViewJob(job?.jobId)}
						className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md"
					>
						View
					</button>
				</div>
			</div>
		</div>
	);
}

export default JobCard;
