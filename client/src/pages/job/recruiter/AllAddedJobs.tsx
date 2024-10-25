import { useEffect, useState } from "react";
import TableComponent from "../../../components/table/TableComponent";
import { notify } from "../../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import {
    deleteAJobApi,
    getAllRecruiterAddedJobsApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { RootState } from "../../../redux/reducer";
import { useSelector } from "react-redux";
import { IJob } from "../../../types/Job";
import { swal } from "../../../utils/swal";

function AllAddedJobs() {
    const navigate = useNavigate();
    const [jobsData, setJobsData] = useState<IJob[]>([]);

    const recruiterData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    useEffect(() => {
        (async () => {
            const response = await getAllRecruiterAddedJobsApi(
                recruiterData?.id
            );

            setJobsData(response.data.jobs);
        })();
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
        {
            name: "Title",
            selector: (row: { title: string }) => row.title,
            sortable: true,
        },
        {
            name: "Location",
            selector: (row: { companyLocation: string }) => row.companyLocation,
            sortable: true,
        },

        {
            name: "View",
            cell: (row: { id: string }) => (
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
            name: "Edit",
            cell: (row: { id: string }) => (
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
            name: "Delete",
            cell: (row: { id: string }) => (
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
            {jobsData.length > 0 ? (
                <div className="mx-14">
                    <TableComponent columns={columns} data={jobsData} />
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
