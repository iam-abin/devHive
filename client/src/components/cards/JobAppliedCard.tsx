import React from "react";
import dayjs from "dayjs";
import { FaShoppingBag } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { formatCurrency } from "../../utils/currency-format";

const JobAppliedCard: React.FC<{ job: any; handleViewJob: any }> = ({
	job,
	handleViewJob,
}) => {
	const date1 = dayjs(Date.now());
	const diffInDays = date1.diff(job.createdAt, "day");
	console.log("in applied jobs card ", job);

	return (
		<div className="mx-40 pb-4" key={job.id}>
			<div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103">
				<div className="flex flex-col items-start gap-3 py-3">
					<h1 className="text-lg font-semibold">
						{job?.jobId.title}
					</h1>
					<div className="flex items-center gap-8">
						<span className="flex items-center gap-1">
							<FaShoppingBag />
							{job?.jobId.employment_type}
						</span>
						<span className="flex items-center gap-1">
							<IoLocationSharp />
							{job?.jobId.location}
						</span>
						<span className="flex items-center gap-1">
							<HiMiniCurrencyRupee />
							<span>{formatCurrency(job?.jobId.salary_max)}</span>
						</span>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<p className="text-gray-500">
						Posted{" "}
						{diffInDays > 1 ? `${diffInDays} days ago` : `today`}{" "}
					</p>

					<button
						onClick={() => handleViewJob(job?.id)}
						className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md  hover:bg-sky-500 hover:text-white"
					>
						View
					</button>
				</div>
			</div>
		</div>
	);
};

export default JobAppliedCard;
