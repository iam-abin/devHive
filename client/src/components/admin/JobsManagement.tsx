import { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getAllJobsApi, blockUnblockJobApi, getAllJobsAdminApi } from "../../api/axios/admin/job";

interface JobInterface {
	id: string;
	jobId: string;
	title: string;
	recruiter: string;
	company: string;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	location?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	isActive?: boolean;
	deadline?: Date;
}

function JobsManagement() {
	const [adminsjobsData, setAdminsjobsData] = useState<JobInterface[]>(
		[]
	);
	const [filteredAdminsJobData, setFilteredAdminsJobData] = useState<
		JobInterface[]
	>([]);

	const [originalIndexMap, setOriginalIndexMap] = useState<{
		[key: string]: number;
	}>({});

	const navigate = useNavigate();

	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};

	useEffect(() => {
		(async () => {
			const jobs = await getAllJobsAdminApi();

			console.log(jobs.data.data);
			// console.log(Array.isArray(jobs.data.data));

			const indexMap: { [key: string]: number } = {};
			const formattedjobs = jobs.data.data.map(
				(recruiter: JobInterface, index: number) => {
					indexMap[recruiter.id] = index;
					return { ...recruiter };
				}
			);

			setAdminsjobsData(formattedjobs);
			setFilteredAdminsJobData(formattedjobs);
			setOriginalIndexMap(indexMap);
		})();
	}, []);


	const viewJobDetails = async (jobId: string) => {
		console.log("in viewProfileDetails fn ", jobId);
		navigate(`/admin/job/viewJobDetails/${jobId}`);
	};

	const handleBlockUnblock = async (jobId: string) => {
		Swal.fire({
			title: "Do you want to Block this Recruiter?",
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Block",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const updatedRecruiter = await blockUnblockJobApi(jobId);
				if (updatedRecruiter) {
					notify(updatedRecruiter.data.message, "success");
				}

				const jobs = adminsjobsData.map((admin) => {
					if (admin.jobId === jobId) {
						return {
							...admin,
							isActive: updatedRecruiter.data.data.isActive,
						};
					}
		
					return admin;
				});
		
				setAdminsjobsData(jobs);
				setFilteredAdminsJobData(jobs);
			}
		});

		
	};

	// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const searchText = e.target.value.toLowerCase().trim();

	// 	const filteredRecruiters = recruitersData.filter((job) => {
	// 		return (
	// 			job.title.toLowerCase().includes(searchText) ||
	// 			job.email.toLowerCase().includes(searchText) ||
	// 			job.phone.toString().toLowerCase().includes(searchText)
	// 		);
	// 	});

	// 	setFilteredRecruitersData(filteredRecruiters);
	// };

	return (
		<div className="mx-24">
			{" "}
			{/* Add mx-4 for horizontal margins */}
			<div className="text-center ">
				<h1 className="font-semibold text-5xl mt-4 mb-10">
					Jobs Management
				</h1>
				<div className="overflow-x-auto">
					<div className="search-container flex justify-end">
						<input
							type="text"
							className="search-box my-3 p-2 border rounded-xl border-slate-800"
							placeholder="Search by name, email, or phone..."
							// onChange={handleSearch}
						/>
					</div>
					<table className="table table-zebra">
						{/* head */}
						<thead className="bg-gray-800 text-white">
							<tr>
								<th>No</th>
								<th>Name</th>
								<th>Location</th>
								<th className="text-center">view</th>
								<th className="">status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{filteredAdminsJobData &&
								filteredAdminsJobData.map(
									({ id, title, location, isActive, jobId }) => (
										<tr key={id}>
											<th>{originalIndexMap[id] + 1}</th>
											<td>{title}</td>
											<td>{location}</td>
											{/* <td>{recruiter}</td>
											<td>{company}</td> */}
											<td className="text-center">
												<button onClick={() => {
														viewJobDetails(jobId);
													}} className="btn btn-info">
													view details
												</button>
											</td>
											<td>
												<div
													className={`badge ${
														isActive
															? "badge badge-success gap-2"
															: "badge badge-error gap-2"
													} `}
												>
													{isActive
														? "active"
														: "inActive"}
												</div>
											</td>
											<td className="text-center">
												<button
													onClick={() => {
														handleBlockUnblock(jobId);
													}}
													className={`btn ${
														isActive
															? "btn-success bg-green-600"
															: "btn btn-error bg-red-600"
													} `}
												>
													{isActive
														? "Block"
														: "unBlock"}
												</button>
											</td>
										</tr>
									)
								)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default JobsManagement;
