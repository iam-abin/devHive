import React from "react";

const CandidateCard: React.FC<{ candidate: any; handleViewCandidate: any }> = ({
	candidate,
	handleViewCandidate,
}) => {
	console.log("in candidate Card");
	console.log("in candidate Card", candidate);
	console.log(candidate.name);

	// Check if candidate or skills_required is undefined before mapping
	if (!candidate) {
		return null; // or render an alternative UI
	}

	return (
		<div className="mx-40 pb-4" key={candidate.id}>
			<div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103">
				<div className="flex flex-col items-start gap-3">
					<h1 className="text-lg font-semibold">{candidate?.name}</h1>
					<p>{candidate?.email}</p>
					<p>{candidate?.phone}</p>
					{/* <p>{candidate?.userType}</p> */}
					<p>
						{candidate?.isActive ? "Active" : "Inactive"}
						{candidate?.isVerified && " • Verified"}
					</p>
				</div>
				<div className="flex items-center gap-4">
					<button
						onClick={() => handleViewCandidate(candidate?.id)}
						className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md"
					>
						View
					</button>
				</div>
			</div>
		</div>
	);
};

export default CandidateCard;
