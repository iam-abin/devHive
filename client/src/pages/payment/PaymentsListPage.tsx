import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';
import { getAllPaymentsApi } from '../../axios/apiMethods/payment-service/admin';
import Swal from 'sweetalert2';
import { notify } from '../../utils/toastMessage';

const PaymentsListPage: React.FC = () => {
  const navigate = useNavigate();
	const [paymentsData, setPaymentsData] = useState(
		[]
	);

	useEffect(() => {
		(async () => {
			try {
				const payments = await getAllPaymentsApi();
				console.log("in useEffect", payments);
				setPaymentsData(payments.data);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, []);

	const viewProfileDetails = async (userId: string) => {
		console.log("in viewProfileDetails fn ", userId);
		navigate(`/admin/candidate/viewProfileDetails/${userId}`);
	};

	// const handleBlockUnblock = async (userId: string, isActive: boolean) => {
	// 	console.log("userId", userId);
	// 	console.log("isActive", isActive);
		
	// 	Swal.fire({
	// 		title: `Do you want to ${
	// 			isActive ? "block" : "unblock"
	// 		} this Candidate?`,
	// 		text: "Are you sure!",
	// 		icon: "warning",
	// 		showCancelButton: true,
	// 		confirmButtonColor: "#3085d6",
	// 		cancelButtonColor: "#d33",
	// 		confirmButtonText: `Yes, ${
	// 			isActive ? "block" : "unblock"
	// 		}`,
	// 	}).then(async (result) => {
	// 		if (result.isConfirmed) {
	// 			const updatedCandidate = await blockUnblockCandidateApi(userId);
	// 			if (updatedCandidate) {
	// 				notify(updatedCandidate.message, "success");
	// 			}

	// 			const candidates = candidatesData.map((candidate) => {
	// 				if (candidate.id === userId) {
	// 					return {
	// 						...candidate,
	// 						isActive: updatedCandidate.data.isActive,
	// 					};
	// 				}

	// 				return candidate;
	// 			});

	// 			setCandidatesData(candidates);
	// 		}
	// 	});
	// };

	const columns = [
		{
			name: "Candidate",
			selector: (row: { candidateId:   { name: string }  }) => row.candidateId.name,
			sortable: true,
		  },
		  {
			name: "Plan",
			selector: (row: { membershipPlanId: { name: string } }) =>
			  row.membershipPlanId.name,
			sortable: true,
		  },
		  {
			name: "Amount Paid",
			selector: (row: { membershipPlanId: { price: number } }) =>
			  row.membershipPlanId.price,
			sortable: true,
		  },


		// {
		// 	name: "View",
		// 	cell: (row: { id: string }) => (
		// 		<button
		// 			onClick={() => {
		// 				viewProfileDetails(row.id);
		// 			}}
		// 			className="btn btn-info btn-sm w-24"
		// 		>
		// 			view details
		// 		</button>
		// 	),
		// },

		// {
		// 	name: "Status",
		// 	cell: (row: { isActive: string }) => (
		// 		<div
		// 			className={`badge ${
		// 				row.isActive
		// 					? "badge badge-success gap-2 w-20"
		// 					: "badge badge-error gap-2 w-20"
		// 			} `}
		// 		>
		// 			{row.isActive ? "active" : "inActive"}
		// 		</div>
		// 	),
		// },
		// {
		// 	name: "Action",
		// 	cell: (row: { id: string; isActive: boolean }) => (
		// 		<button
		// 			onClick={() => {
		// 				handleBlockUnblock(row.id, row.isActive);
		// 			}}
		// 			className={`btn ${
		// 				row.isActive
		// 					? "btn-success btn-sm w-24 bg-green-600"
		// 					: "btn btn-error btn-sm w-24 bg-red-600"
		// 			} `}
		// 		>
		// 			{row.isActive ? "Block" : "unBlock"}
		// 		</button>
		// 	),
		// },
	];

	return (
		<div className="text-center mx-10">
			<h1 className="font-semibold text-5xl mt-4 mb-10">
				Payments Management
			</h1>
			<TableComponent columns={columns} data={paymentsData} />
		</div>
	);
}

export default PaymentsListPage
