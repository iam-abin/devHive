import { useEffect, useState } from "react";
import {
	blockUnblockCandidateApi,
	getAllCandidatesApi,
} from "../../api/axios/admin/candidates";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CandidateInterface {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
}

function CandidatesManagement() {
	const [candidatesData, setCandidatesData] = useState<CandidateInterface[]>(
		[]
	);
	const [filteredCandidatesData, setFilteredCandidatesData] = useState<
		CandidateInterface[]
	>([]);

	const [originalIndexMap, setOriginalIndexMap] = useState<{
		[key: string]: number;
	}>({});

	useEffect(() => {
		(async () => {
			const candidates = await getAllCandidatesApi();
			// console.log(candidates.data.data);
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
		})();
	}, []);

	const handleBlockUnblock = async (id: string) => {
		const updatedCandidate = await blockUnblockCandidateApi(id);

		toast.success(updatedCandidate.data.message, {
			position: toast.POSITION.TOP_RIGHT,
		});

		const candidates = candidatesData.map((candidate) => {
			if (candidate.id === id) {
				return {
					...candidate,
					isActive: updatedCandidate.data.data.isActive,
				};
			}

			return candidate;
		});

		setCandidatesData(candidates);
		setFilteredCandidatesData(candidates);
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
									({ id, name, email, phone, isActive }) => (
										<tr key={id}>
											<th>{originalIndexMap[id] + 1}</th>
											<td>{name}</td>
											<td>{email}</td>
											<td>{phone}</td>
											<td className="text-center">
												<button className="btn btn-info">
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
														handleBlockUnblock(id);
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
