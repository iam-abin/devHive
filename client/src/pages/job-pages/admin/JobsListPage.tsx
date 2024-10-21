import { useEffect, useState } from "react";
import TableComponent from "../../../components/table/TableComponent";
import { notify } from "../../../utils/toastMessage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
    blockUnblockJobApi,
    getAllJobsAdminApi,
} from "../../../axios/apiMethods/admin-service/job";

interface JobInterface {
    id: string;
    jobId: string;
    title: string;
    recruiterId: string;
    company: string;
    jobDescription?: string;
    skills?: string[];
    availablePosition?: number;
    experienceRequired?: number;
    educationRequired?: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    has_applied?: boolean;
    isActive?: boolean;
    deadline?: Date;
}

function JobsManagementPage() {
    const navigate = useNavigate();
    const [jobsData, setJobsData] = useState<JobInterface[]>([]);

    useEffect(() => {
        (async () => {
            const jobs = await getAllJobsAdminApi();
            setJobsData(jobs.data);
        })();
    }, []);

    const viewJobDetails = async (jobId: string) => {
        navigate(`/admin/job/viewJobDetails/${jobId}`);
    };

    const handleBlockUnblock = async (jobId: string, isActive: boolean) => {
        Swal.fire({
            title: `Do you want to ${isActive ? "block" : "unblock"} this Job?`,
            text: "Are you sure!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${isActive ? "block" : "unblock"}`,
        }).then(async (result) => {
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
            name: "Action",
            cell: (row: { id: string; isActive: boolean }) => (
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

    // const data = []

    return (
        <div className="text-center mx-10">
            {/* <SideNavBar /> */}
            <h1 className="font-semibold text-5xl mt-4 mb-10">
                Jobs Management
            </h1>
            <TableComponent columns={columns} data={jobsData} />
        </div>
    );
}

export default JobsManagementPage;
