import { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import { getAllPaymentsApi } from '../../axios/apiMethods/payment-service/admin';
import SearchBar from '../../components/filterSearch/SearchBar';
import { IResponse } from '../../types/api';
import { SEARCH_RESOURCE_TYPES } from '../../utils/constants';
import { searchApi } from '../../axios/apiMethods/admin-service/search';

const PaymentsListPage = () => {
    const [paymentsData, setPaymentsData] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");


    const PAYMENTS_PER_PAGE: number = 2;

    const columns = [
        { Header: 'Candidate', accessor: 'candidateId.name' },
        { Header: 'Email', accessor: 'candidateId.email' },
        { Header: 'Plan', accessor: 'membershipPlanId.name' },
        { Header: 'Amount Paid', accessor: 'membershipPlanId.price' },
    ];

    const fetchPayments = async (currentPage: number) => {
        let paymentList: IResponse | null = null;
        if(!searchKey){
            paymentList = await getAllPaymentsApi(currentPage, PAYMENTS_PER_PAGE); // Adjusted page size to match rowsPerPage
            setPaymentsData(paymentList.data.payments);
        }else{
            paymentList = await searchApi(searchKey, SEARCH_RESOURCE_TYPES.PAYMENTS, currentPage, PAYMENTS_PER_PAGE); // Adjusted page size to match rowsPerPage
            setPaymentsData(paymentList.data.result);
        }
        setNumberOfPages(paymentList.data.numberOfPages);
    };

    // Reset to page 1 when starting a new search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchKey]);

    useEffect(() => {
        fetchPayments(1); // Fetch initial data for the first page
    }, [searchKey, currentPage]);

    return (
        <div className="text-center mx-10">
            <h1 className="font-semibold text-5xl mt-4 mb-10">
                Payments Management
            </h1>
            <div className="flex flex-row justify-end my-2">
                <SearchBar placeholder={"search with name"} onSearch={setSearchKey} />
            </div>
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