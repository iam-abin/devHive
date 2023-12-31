import { useEffect, useState } from "react";
// import SideNavBar from "../../components/admin/SideNavBar";
import TableComponent from "../../../components/table/TableComponent";
import {
	blockUnblockRecruiterApi,
	getAllRecruitersApi,
} from "../../../axios/apiMethods/admin-service/recruiters";
import { notify } from "../../../utils/toastMessage";
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

function RecruiterManagementPage() {
	const navigate = useNavigate();
	const [recruitersData, setRecruitersData] = useState<RecruiterInterface[]>(
		[]
	);

	useEffect(() => {
		(async () => {
			try {
				const recruiters = await getAllRecruitersApi();
				console.log("in useEffect", recruiters.data);
				setRecruitersData(recruiters.data);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, []);

	const viewProfileDetails = async (userId: string) => {
		console.log("in viewProfileDetails fn ", userId);
		navigate(`/admin/recruiter/viewProfileDetails/${userId}`);
	};

	const handleBlockUnblock = async (userId: string, isActive: boolean) => {
		Swal.fire({
			title: `Do you want to ${
				isActive ? "block" : "unblock"
			} this Recruiter?`,
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
					notify(updatedRecruiter.message, "success");
				}

				const recruiters = recruitersData.map((recruiter) => {
					if (recruiter.userId === userId) {
						return {
							...recruiter,
							isActive: updatedRecruiter.data.isActive,
						};
					}

					return recruiter;
				});

				setRecruitersData(recruiters);
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
			name: "Email",
			selector: (row: { email: string }) => row.email,
			sortable: true,
		},
		{
			name: "Phone",
			selector: (row: { phone: number }) => row.phone,
			sortable: true,
		},

		{
			name: "View",
			cell: (row: { userId: string }) => (
				<button
					onClick={() => {
						viewProfileDetails(row.userId);
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
			cell: (row: { userId: string; isActive: boolean }) => (
				<button
					onClick={() => {
						handleBlockUnblock(row.userId, row.isActive);
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
		<div className="text-center mx-24">
			{/* <SideNavBar /> */}
			<h1 className="font-semibold text-5xl mt-4 mb-10">
				Recruiters Management
			</h1>
			<TableComponent columns={columns} data={recruitersData} />
		</div>
	);
}

export default RecruiterManagementPage;
