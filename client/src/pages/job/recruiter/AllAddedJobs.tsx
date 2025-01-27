import { useEffect, useState } from "react";
import { notify } from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import {
    deleteAJobApi,
    getAllRecruiterAddedJobsApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { IJob } from "../../../types/Job";
import { swal } from "../../../utils/swal";
import Table from "../../../components/table/Table";
import { IResponse } from "../../../types/api";
import TableShimmer from "../../../components/shimmer/table/TableShimmer";

function AllAddedJobs() {
    const navigate = useNavigate();
    const [jobsData, setJobsData] = useState<IJob[]>([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const JOBS_PER_PAGE: number = 2;

    const fetchJobs = async (currentPage: number) => {
        try {
            setLoading(true)
            const jobsData: IResponse = await getAllRecruiterAddedJobsApi(
                currentPage,
                JOBS_PER_PAGE
            );
            setJobsData(jobsData.data.jobs);
            setNumberOfPages(jobsData.data.numberOfPages);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchJobs(1); // Fetch initial data for the first page
    }, []);

    const viewJobDetails = async (id: string) => {
        navigate(`/recruiter/job-details/${id}`);
    };

    const handleEdit = async (id: string) => {
        navigate(`/recruiter/edit-job-details/${id}`);
    };

    const handleDelete = async (id: string) => {
        swal(`Do you want to Delete this Job?`, "Yes, Delete").then(
            async (result) => {
                if (result.isConfirmed) {
                    const deleteJobResponse = await deleteAJobApi(id);
                    if (deleteJobResponse) {
                        notify(deleteJobResponse.message, "success");
                    }
                    setJobsData(deleteJobResponse.data);
                }
            }
        );
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
            Header: "Edit",
            button: (row: { id: string }) => (
                <button
                    onClick={() => {
                        handleEdit(row.id);
                    }}
                    className="btn btn-info btn-sm w-24"
                >
                    Edit
                </button>
            ),
        },
        {
            Header: "Delete",
            button: (row: { id: string }) => (
                <button
                    onClick={() => {
                        handleDelete(row.id);
                    }}
                    className="btn btn-info btn-sm w-24"
                >
                    Delete
                </button>
            ),
        },
    ];


    return (
        <div>
            <div className="flex items-center justify-center pt-5">
                <h1 className="text-3xl font-bold">My Jobs</h1>
            </div>
            <div className="navbar">
                <div className="flex-1">
                    <button
                        className="btn btn-accent ml-10"
                        onClick={() => navigate("/recruiter/create-job")}
                    >
                        {" "}
                        + Create Job
                    </button>
                </div>
            </div>
            {loading?<TableShimmer columnCount={4} rowCount={JOBS_PER_PAGE} />:jobsData.length > 0 ? (
                <div className="mx-14">
                    <Table
                        columns={columns}
                        data={jobsData}
                        numberOfPages={numberOfPages}
                        fetchData={fetchJobs}
                    />
                </div>
            ) : (
                <div className="text-center text-7xl my-60 font-bold text-orange-800">
                    You haven't added any jobs yet
                </div>
            )}
        </div>
    );
}

export default AllAddedJobs;
