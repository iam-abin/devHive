import React from "react";

const AdminViewJobDetailsCard: React.FC<{
	data: any;
	handleBlockUnblock: any;
}> = ({ data, handleBlockUnblock }) => {
	return (
		<div className="container mx-auto mt-8 flex justify-center">
			<div className="bg-white p-10 rounded-lg shadow-md w-4/5">
				{data ? (
					<>
						<h2 className="text-3xl font-bold mb-4 flex">
							{data.title}
						</h2>
						<div className=" mb-4 flex">
							<p className="w-3/5">Company :</p>
							<span className="w-3/5">{data.company_name}</span>
						</div>
						<div className=" mb-4 flex">
							<p className="w-3/5">Available positions :</p>
							<span className="w-3/5">
								{data.available_position}
							</span>
						</div>
						<div className=" mb-4 flex">
							<p className="w-3/5">Experience required :</p>
							<span className="w-3/5">
								{data.experience_required}
							</span>
						</div>
						<div className="mb-4 flex">
							<p className="font-semibold w-3/5">Location:</p>{" "}
							<span className="w-3/5">
								{data.company_location}
							</span>
						</div>
						<div className="mb-4 flex">
							<p className="font-semibold w-3/5">Employment Type:</p>{" "}
							<span className="w-3/5">{data.employment_type}</span>
							
						</div>
						<div className="mb-4 flex">
							<p className="font-semibold w-3/5">Salary:</p>{" "}
							<span className="w-3/5">{`₹${data.salary_min} - ₹${data.salary_max}`}</span>
							
						</div>
						<div className="mb-4 flex">
							<p className="font-semibold w-3/5">
								Job description:
							</p>{" "}
							<span className="mb-4 flex w-3/5">
								{data.job_descriptions}
							</span>
						</div>
						<div className="mb-4 flex">
							<p className="font-semibold w-3/5">
								Skills Required:
							</p>{" "}
								<ul className="w-3/5">
									{data.skills_required ? (
										data.skills_required.map(
											(skill: string) => (
												<div
													key={skill}
													className="badge text-white bg-sky-700 p-4 flex flex-row gap-2"
												>
													<li>{skill}</li>
												</div>
											)
										)
									) : (
										<li>Loading...</li>
									)}
								</ul>
						</div>
						<div className="mb-4 flex">
							<p className="font-semibold w-3/5">
								Active Status:
							</p>{" "}
							{data.isActive ? (
								<span className="text-green-600 w-3/5">Active</span>
							) : (
								<span className="text-red-600 w-3/5">Inactive</span>
							)}
						</div>
						<div className="mb-4 flex justify-end">
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

export default AdminViewJobDetailsCard;
