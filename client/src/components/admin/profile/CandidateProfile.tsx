import React from "react";
import { ICandidateProfile } from "../../../types/profile";

const CandidateProfile: React.FC<{ data: Partial<ICandidateProfile> }> = ({ data }) => {
	return (
		<div className="container mx-auto mt-8">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-4">
					Details of {data?.name}
				</h2>

				{data ? (
					<div>
						<p className="mb-2">
							<span className="font-semibold">Name:</span>{" "}
							{data?.name}
						</p>
						<p className="mb-2">
							<span className="font-semibold">Email:</span>{" "}
							{data?.email}
						</p>
						<p className="mb-2">
							<span className="font-semibold">Phone:</span>{" "}
							{data?.phone}
						</p>
						<p className="mb-2">
							<span className="font-semibold">About:</span>{" "}
							{data?.about}
						</p>
						<p className="mb-2">
							<span className="font-semibold">
								Active Status:
							</span>{" "}
							{data?.isActive ? "Active" : "Inactive"}
						</p>
						{/* Add other fields */}
						{data?.gender && (
							<p className="mb-2">
								<span className="font-semibold">Gender:</span>{" "}
								{data.gender}
							</p>
						)}
						{data?.currentLocation && (
							<p className="mb-2">
								<span className="font-semibold">
									Current Location:
								</span>{" "}
								{data.currentLocation}
							</p>
						)}
						{data?.address && (
							<p className="mb-2">
								<span className="font-semibold">Address:</span>{" "}
								{data.address}
							</p>
						)}
						{/* Add other fields as needed */}
					</div>
				) : (
					<div className="text-red-500">No candidate data found</div>
				)}
			</div>
		</div>
	);
};

export default CandidateProfile;
