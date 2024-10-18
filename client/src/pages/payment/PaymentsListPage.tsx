import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/table/TableComponent';
import { getAllPaymentsApi } from '../../axios/apiMethods/payment-service/admin';
import { notify } from '../../utils/toastMessage';

const PaymentsListPage: React.FC = () => {
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
