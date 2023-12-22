
import { useEffect, useState } from "react";
import { blockUnblockCompanyApi, getAllCompaniesApi } from "../../axios/api/admin/company";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminSignout } from "../../redux/slice/adminSlice/adminAuthSlice";
import { useDispatch } from "react-redux";

interface CompanyInterface {
	id: string;
	name: string;
	company_location: string;
	email?: string;
	isActive: boolean;
}

function CompaniesManagement() {
	const dispatch = useDispatch();
	const [companiesData, setCompaniesData] = useState<CompanyInterface[]>(
		[]
	);
	const [filteredCompaniesData, setFilteredCompaniesData] = useState<
		CompanyInterface[]
	>([]);

	const [originalIndexMap, setOriginalIndexMap] = useState<{
		[key: string]: number;
	}>({});

	

	useEffect(() => {
		(async () => {
			try {
				const companies = await getAllCompaniesApi();
			// console.log(companies.data.data);
			// console.log(Array.isArray(companies.data.data));

			const indexMap: { [key: string]: number } = {};
			const formattedCompanies = companies.data.data.map(
				(companies: CompanyInterface, index: number) => {
					indexMap[companies.id] = index;
					return { ...companies };
				}
			);

			setCompaniesData(formattedCompanies);
			setFilteredCompaniesData(formattedCompanies);
			setOriginalIndexMap(indexMap);
			} catch (error: any) {
				if (error.request.status === 401) {
					dispatch(adminSignout());
				}
			}
		})();
	}, []);


	const handleBlockUnblock = async (id: string) => {
		const updatedCandidate = await blockUnblockCompanyApi(id);

		toast.success(updatedCandidate.data.message, {
			position: toast.POSITION.TOP_RIGHT,
		});

		const companies = companiesData.map((companies) => {
			if (companies.id === id) {
				return {
					...companies,
					isActive: updatedCandidate.data.data.isActive,
				};
			}

			return companies;
		});

		setCompaniesData(companies);
		setFilteredCompaniesData(companies);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value.toLowerCase().trim();

		const filteredCompanies = companiesData.filter((companies) => {
			return (
				companies.name.toLowerCase().includes(searchText) ||
				companies?.email?.toLowerCase().includes(searchText)
			);
		});

		setFilteredCompaniesData(filteredCompanies);
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
							{filteredCompaniesData &&
								filteredCompaniesData.map(
									({ id, name, email, isActive }) => (
										<tr key={id}>
											<th>{originalIndexMap[id] + 1}</th>
											<td>{name}</td>
											<td>{email}</td>
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

export default CompaniesManagement;
