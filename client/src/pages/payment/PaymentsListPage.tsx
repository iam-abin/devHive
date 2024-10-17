import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';
import { getAllPaymentsApi } from '../../axios/apiMethods/payment-service/admin';
import { notify } from '../../utils/toastMessage';
// import Swal from 'sweetalert2';
// import { notify } from '../../utils/toastMessage';

const PaymentsListPage: React.FC = () => {
//   const navigate = useNavigate();
	const [paymentsData, setPaymentsData] = useState(
		[]
	);

	useEffect(() => {
		(async () => {
			try {
				const payments = await getAllPaymentsApi();
				setPaymentsData(payments.data);
			} catch (error: any) {
				notify(error.response.data.errors[0].message, "error");
			}
		})();
	}, []);

	const columns = [
		{
			name: "Candidate",
			selector: (row: { candidateId:   { name: string }  }) => row.candidateId?.name,
			sortable: true,
		  },
		  {
			name: "Plan",
			selector: (row: { membershipPlanId: { name: string } }) =>
			  row.membershipPlanId?.name,
			sortable: true,
		  },
		  {
			name: "Amount Paid",
			selector: (row: { membershipPlanId: { price: number } }) =>
			  row.membershipPlanId?.price,
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
