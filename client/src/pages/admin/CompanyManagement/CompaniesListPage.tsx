import React from "react";
// import SideNavBar from "../../components/admin/SideNavBar";
import TableComponent from "../../../components/table/TableComponent";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blockUnblockCompanyApi, getAllCompaniesApi } from "../../../axios/apiMethods/admin-service/company";
import Swal from "sweetalert2";
import { notify } from "../../../utils/toastMessage";

interface CompanyInterface {
	id: string;
	name: string;
    companyId?: string;
	company_location: string;
	email?: string;
	isActive: boolean;
}


const CompaniesListPage: React.FC = () => {
	const navigate = useNavigate();
	const [companiesData, setCompaniesData] = useState<CompanyInterface[]>(
		[]
	);
	// const [filteredCompaniesData, setFilteredCompaniesData] = useState<
	// 	CompanyInterface[]
	// >([]);

	// const [originalIndexMap, setOriginalIndexMap] = useState<{
	// 	[key: string]: number;
	// }>({});

    
	useEffect(() => {
		(async () => {
			try {
				const companies = await getAllCompaniesApi();
                console.log("in useEffect", companies.data);
				setCompaniesData(companies.data);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, []);

    const viewCompanyDetails = async (companyId: string) => {
		console.log("in viewCompanyDetails fn ", companyId);
		navigate(`/admin/company/viewCompanyDetails/${companyId}`);
	};


	const handleBlockUnblock = async (companyId: string, isActive: boolean) => {

		Swal.fire({
			title: `Do you want to ${
				isActive ? "block" : "unblock"
			} this Company?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `Yes, ${
				isActive ? "block" : "unblock"
			}`,
		}).then(async (result) => {
			if (result.isConfirmed) {
                const updatedCompany = await blockUnblockCompanyApi(companyId);
				if (updatedCompany) {
					notify(updatedCompany.message, "success");
				}

				const companies = companiesData.map((company) => {
					if (company.companyId === companyId) {
						return {
							...company,
							isActive: updatedCompany.data.isActive,
						};
					}

					return company;
				});

				setCompaniesData(companies);
			}
		});
	};

	const columns = [
		{
			name: "Name",
			selector: (row: { name: string }) => row.name,
			sortable: true,
		},
		{
			name: "Location",
			selector: (row: { company_location: string }) => row.company_location,
			sortable: true,
		},
		// {
		// 	name: "Email",
		// 	selector: (row: { email: number }) => row.email,
		// 	sortable: true,
		// },

		{
			name: "View",
			cell: (row: { companyId: string }) => (
				<button
					onClick={() => {
						viewCompanyDetails(row.companyId);
					}}
					className="btn btn-info btn-sm w-24"
				>
					view details
				</button>
			),
		},

		{
			name: "Status",
			cell: (row: { isActive: string }) => (
				<div
					className={`badge ${
						row.isActive
							? "badge badge-success gap-2 w-20"
							: "badge badge-error gap-2 w-20"
					} `}
				>
					{row.isActive ? "active" : "inActive"}
				</div>
			),
		},
		{
			name: "Action",
			cell: (row: { companyId: string; isActive: boolean }) => (
				<button
					onClick={() => {
						handleBlockUnblock(row.companyId, row.isActive);
					}}
					className={`btn ${
						row.isActive
							? "btn-success btn-sm w-24 bg-green-600"
							: "btn btn-error btn-sm w-24 bg-red-600"
					} `}
				>
					{row.isActive ? "Block" : "unBlock"}
				</button>
			),
		},
	];


	return (
		<div className="text-center mx-10">
			{/* <SideNavBar /> */}
			<h1 className="font-semibold text-5xl mt-4 mb-10">
				Company Management
			</h1>
			<TableComponent columns={columns} data={companiesData} />
		</div>
	);
};

export default CompaniesListPage;
