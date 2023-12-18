import { useEffect, useState } from "react";
import {
	blockUnblockCandidateApi,
	getAllCandidatesApi,
} from "../../api/axios/admin/candidates";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminSignout } from "../../redux/slice/adminSlice/adminAuthSlice";

interface CandidateInterface {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
	userId: string;
}

function CandidatesManagement() {
	const dispatch = useDispatch();
	const [candidatesData, setCandidatesData] = useState<CandidateInterface[]>(
		[]
	);
	const [filteredCandidatesData, setFilteredCandidatesData] = useState<
		CandidateInterface[]
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
			try {
				const candidates = await getAllCandidatesApi();
				console.log("in useEffect", candidates.data.data);
				// console.log(Array.isArray(candidates.data.data));

				const indexMap: { [key: string]: number } = {};
				const formattedCandidates = candidates.data.data.map(
					(candidate: CandidateInterface, index: number) => {
						indexMap[candidate.id] = index;
						return { ...candidate };
					}
				);

				setCandidatesData(formattedCandidates);
				setFilteredCandidatesData(formattedCandidates);
				setOriginalIndexMap(indexMap);
			} catch (error: any) {
				if (error.request.status === 401) {
					dispatch(adminSignout());
				}
			}
		})();
	}, []);

	const viewProfileDetails = async (userId: string) => {
		console.log("in viewProfileDetails fn ", userId);
		navigate(`/admin/candidate/viewProfileDetails/${userId}`);
	};

	const handleBlockUnblock = async (userId: string, isActive: boolean) => {
		Swal.fire({
			title: `Do you want to ${
				isActive ? "block" : "unblock"
			}  this Candidate?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Block",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const updatedCandidate = await blockUnblockCandidateApi(userId);
				console.log("updated candidate data", updatedCandidate);

				if (updatedCandidate) {
					notify(updatedCandidate.data.message, "success");
				}

				const candidates = candidatesData.map((candidate) => {
					if (candidate.userId === userId) {
						return {
							...candidate,
							isActive: updatedCandidate.data.data.isActive,
						};
					}

					return candidate;
				});

				setCandidatesData(candidates);
				setFilteredCandidatesData(candidates);
			}
		});
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value.toLowerCase().trim();

		const filteredCandidates = candidatesData.filter((candidate) => {
			return (
				candidate.name.toLowerCase().includes(searchText) ||
				candidate.email.toLowerCase().includes(searchText) ||
				candidate.phone.toString().toLowerCase().includes(searchText)
			);
		});

		setFilteredCandidatesData(filteredCandidates);
	};

	return (
		<div className="mx-24">
			{" "}
			{/* Add mx-4 for horizontal margins */}
			<div className="text-center ">
				<h1 className="font-semibold text-5xl mt-4 mb-10">
					Candidates Management
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
							{filteredCandidatesData &&
								filteredCandidatesData.map(
									({
										id,
										name,
										email,
										phone,
										isActive,
										userId,
									}) => (
										<tr key={id}>
											<th>{originalIndexMap[id] + 1}</th>
											<td>{name}</td>
											<td>{email}</td>
											<td>{phone}</td>
											<td className="text-center">
												<button
													onClick={() => {
														viewProfileDetails(
															userId
														);
													}}
													className="btn btn-info "
												>
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
												{/* /admin/candidate/viewProfile/ */}
											</td>
											<td className="text-center">
												<button
													onClick={() => {
														handleBlockUnblock(
															userId,
															isActive
														);
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

export default CandidatesManagement;
