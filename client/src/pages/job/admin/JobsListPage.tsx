import { useEffect, useState } from "react";

import { notify } from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import {
    blockUnblockJobApi,
    getAllJobsAdminApi,
} from "../../../axios/apiMethods/admin-service/job";
import { swal } from "../../../utils/swal";
import { IResponse } from "../../../types/api";
import Table from "../../../components/table/Table";
import { IJob } from "../../../types/Job";

function JobsManagementPage() {
    const navigate = useNavigate();
    const [jobsData, setJobsData] = useState<IJob[]>([]);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const JOBS_PER_PAGE: number = 2;

    const fetchJobs = async (currentPage: number) => {
        const jobsData: IResponse  = await getAllJobsAdminApi(currentPage, JOBS_PER_PAGE);
        setJobsData(jobsData.data.jobs);
            setNumberOfPages(jobsData.data.numberOfPages);
        
    };

    useEffect(() => {
        fetchJobs(1); // Fetch initial data for the first page
    }, []);


    const viewJobDetails = async (jobId: string): Promise<void> => {
        navigate(`/admin/job/viewJobDetails/${jobId}`);
    };

    const handleBlockUnblock = async (jobId: string, isActive: boolean) => {
        swal(
            `Do you want to ${isActive ? "block" : "unblock"} this Job?`,
            `Yes, ${isActive ? "block" : "unblock"}`
        ).then(async (result) => {
            if (result.isConfirmed) {
                const updatedJob = await blockUnblockJobApi(jobId);
                if (updatedJob) {
                    notify(updatedJob.message, "success");
                }

                const jobs = jobsData.map((job) => {
                    if (job.id === jobId) {
                        return {
                            ...job,
                            isActive: updatedJob.data.isActive,
                        };
                    }

                    return job;
                });

                setJobsData(jobs);
            }
        });
    };

    const columns = [
        { Header: "Title", accessor: "title" },
        { Header: "Location", accessor: "companyLocation" },
        {
            Header: "View",
            button: (row: { id: string }) => (
                <button
                    onClick={() => {
                        viewJobDetails(row.id);
                    }}
                    className="btn btn-info btn-sm w-24"
                >
                    view details
                </button>
            ),
        },
        {
            Header: "Status",
            button: (row: { isActive: string }) => (
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
            Header: "Action",
            button: (row: { id: string; isActive: boolean }) => (
                <button
                    onClick={() => {
                        handleBlockUnblock(row.id, row.isActive);
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
            <h1 className="font-semibold text-5xl mt-4 mb-10">
                Jobs Management
            </h1>
            <Table
                columns={columns}
                data={jobsData}
                numberOfPages={numberOfPages}
                fetchData={fetchJobs}
            />
        </div>
    );
}

export default JobsManagementPage;
