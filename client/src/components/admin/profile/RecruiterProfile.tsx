import React from "react";
import { IRecruiterProfile } from "../../../types/profile";

const RecruiterProfile: React.FC<{ data: Partial<IRecruiterProfile> }> = ({ data }) => {
	return (
		<div className="container mx-auto mt-8">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-4">View Details Page</h2>

				{data ? (
					<div>
						<p className="my-7">
							<span className="font-semibold">Name:</span>{" "}
							{data?.name}
						</p>
						<p className="my-7">
							<span className="font-semibold">Email:</span>{" "}
							{data?.email}
						</p>
						<p className="my-7">
							<span className="font-semibold">Phone:</span>{" "}
							{data?.phone}
						</p>
						<p className="my-7">
							<span className="font-semibold">
								Active Status:
							</span>{" "}
							{data?.isActive ? "Active" : "Inactive"}
						</p>
						<p className="my-7">
							<span className="font-semibold">Company name:</span>{" "}
							{data?.companyName}
						</p>
						<p className="my-7">
							<span className="font-semibold">Company location:</span>{" "}
							{data?.companyLocation}
						</p>
					</div>
				) : (
					<div className="text-red-500">No candidate data found</div>
				)}
			</div>
		</div>
	);
};

export default RecruiterProfile;
