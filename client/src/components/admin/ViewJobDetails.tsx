import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewJobDetails: React.FC<{ data: any; handleBlockUnblock: any }> = ({
	data,
	handleBlockUnblock,
}) => {
	return (
		<div className="container mx-auto mt-8">
			<div className="bg-white p-8 rounded-lg shadow-md">
				{data ? (
					<>
						<h2 className="text-3xl font-bold mb-4">
							{data.title}
						</h2>
						{/* <p className="text-gray-600 mb-4">
              {data.recruiter} at {data.company}
            </p> */}
						<div className="mb-4">
							<span className="font-semibold">Job ID:</span>{" "}
							{data.jobId}
						</div>
						<div className="mb-4">
							<span className="font-semibold">Location:</span>{" "}
							{data.location}
						</div>
						<div className="mb-4">
							<span className="font-semibold">
								Employment Type:
							</span>{" "}
							{data.employment_type}
						</div>
						<div className="mb-4">
							<span className="font-semibold">Salary:</span>{" "}
							{`₹${data.salary_min} - ₹${data.salary_max}`}
						</div>
						{/* <div className="mb-4">
							<span className="font-semibold">Deadline:</span>{" "}
							{data.deadline
								? new Date(
										data.deadline
								  ).toLocaleDateString()
								: "N/A"}
						</div> */}
						<div className="mb-4">
							<span className="font-semibold">
								Job description:
							</span>{" "}
							<p className="mb-4">{data.job_descriptions}</p>
						</div>
						<div className="mb-4">
							<span className="font-semibold">
								Skills Required:
							</span>{" "}
							{Array.isArray(data.skills_required)
								? data.skills_required.join(", ")
								: data.skills_required}
						</div>
						<div className="mb-4">
							<span className="font-semibold">
								Active Status:
							</span>{" "}
							{data.isActive ? (
								<span className="text-green-600">Active</span>
							) : (
								<span className="text-red-600">Inactive</span>
							)}
						</div>
						<div className="mb-4">
							<button
								onClick={handleBlockUnblock}
								className={`${
									data.isActive
										? "bg-red-500 text-white"
										: "bg-green-500 text-white"
								} px-4 py-2 rounded-md`}
							>
								{data.isActive ? "Block" : "Unblock"}
							</button>
						</div>
					</>
				) : (
					<div className="text-red-500">No Job data found</div>
				)}
			</div>
		</div>
	);
};

export default ViewJobDetails;
