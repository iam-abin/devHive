import { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import { getAllPaymentsApi } from '../../axios/apiMethods/payment-service/admin';

const PaymentsListPage = () => {
    const [paymentsData, setPaymentsData] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const PAYMENTS_PER_PAGE: number = 2;

    const columns = [
        { Header: 'Candidate', accessor: 'candidateId.name' },
        { Header: 'Email', accessor: 'candidateId.email' },
        { Header: 'Plan', accessor: 'membershipPlanId.name' },
        { Header: 'Amount Paid', accessor: 'membershipPlanId.price' },
    ];

    const fetchPayments = async (currentPage: number) => {
        const paymentList = await getAllPaymentsApi(currentPage, PAYMENTS_PER_PAGE); // Adjusted page size to match rowsPerPage
        setPaymentsData(paymentList.data.payments);
        setNumberOfPages(paymentList.data.numberOfPages);
    };

    useEffect(() => {
        fetchPayments(1); // Fetch initial data for the first page
    }, []);

    return (
        <div className="text-center mx-10">
            <h1 className="font-semibold text-5xl mt-4 mb-10">
                Payments Management
            </h1>
            <Table 
                columns={columns} 
                data={paymentsData} 
                numberOfPages={numberOfPages} 
                fetchData={fetchPayments} 
            />
        </div>
    );
};

export default PaymentsListPage;