import { useEffect, useState } from "react";
import {
	blockUnblockRecruiterApi,
	getAllRecruitersApi,
} from "../../api/axios/admin/recruiters";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface RecruiterInterface {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
	userId: string;
}

function RecruitersManagement() {
	const [recruitersData, setRecruitersData] = useState<RecruiterInterface[]>(
		[]
	);
	const [filteredRecruitersData, setFilteredRecruitersData] = useState<
		RecruiterInterface[]
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
			const recruiters = await getAllRecruitersApi();
			console.log(recruiters.data.data);
			// console.log(Array.isArray(recruiters.data.data));

			const indexMap: { [key: string]: number } = {};
			const formattedRecruiters = recruiters.data.data.map(
				(recruiter: RecruiterInterface, index: number) => {
					indexMap[recruiter.id] = index;
					return { ...recruiter };
				}
			);

			setRecruitersData(formattedRecruiters);
			setFilteredRecruitersData(formattedRecruiters);
			setOriginalIndexMap(indexMap);
		})();
	}, []);


	const viewProfileDetails = async (userId: string) => {
		console.log("in viewProfileDetails fn ", userId);
		navigate(`/admin/recruiter/viewProfileDetails/${userId}`);
	};

	const handleBlockUnblock = async (userId: string,  isActive: boolean) => {
		Swal.fire({
			title: `Do you want to ${isActive ?"block": "unblock"} this Recruiter?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Block",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const updatedRecruiter = await blockUnblockRecruiterApi(userId);
				if (updatedRecruiter) {
					notify(updatedRecruiter.data.message, "success");
				}

				const recruiters = recruitersData.map((recruiter) => {
					if (recruiter.userId === userId) {
						return {
							...recruiter,
							isActive: updatedRecruiter.data.data.isActive,
						};
					}
		
					return recruiter;
				});
		
				setRecruitersData(recruiters);
				setFilteredRecruitersData(recruiters);
			}
		});

		
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value.toLowerCase().trim();

		const filteredRecruiters = recruitersData.filter((recruiter) => {
			return (
				recruiter.name.toLowerCase().includes(searchText) ||
				recruiter.email.toLowerCase().includes(searchText) ||
				recruiter.phone.toString().toLowerCase().includes(searchText)
			);
		});

		setFilteredRecruitersData(filteredRecruiters);
	};

	return (
		<div className="mx-24">
			{" "}
			{/* Add mx-4 for horizontal margins */}
			<div className="text-center ">
				<h1 className="font-semibold text-5xl mt-4 mb-10">
					Recruiters Management
				</h1>
				<div className="overflow-x-auto">
					<div className="search-container flex justify-end">
						<input
							type="text"
							className="search-box my-3 p-2 border rounded-xl border-slate-800"
							placeholder="Search by name, email, or phone..."
							onChange={handleSearch}
						/>
					</div>
					<table className="table table-zebra">
						{/* head */}
						<thead className="bg-gray-800 text-white">
							<tr>
								<th>No</th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th className="text-center">view</th>
								<th className="">status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{filteredRecruitersData &&
								filteredRecruitersData.map(
									({ id, name, email, phone, isActive, userId }) => (
										<tr key={id}>
											<th>{originalIndexMap[id] + 1}</th>
											<td>{name}</td>
											<td>{email}</td>
											<td>{phone}</td>
											<td className="text-center">
												<button onClick={() => {
														viewProfileDetails(userId);
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
														handleBlockUnblock(userId, isActive);
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

export default RecruitersManagement;
