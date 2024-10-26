import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobsApplicationsForRecruiterApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { formatDate } from "../../../utils/date-functions";
import { IJob } from "../../../types/Job";
import Table from "../../../components/table/Table";
import { IResponse } from "../../../types/api";

interface JobInterface {
    id: string;
    title: string;
    recruiter: string;
    company: string;
    jobDescription?: string;
    skills?: string | string[];
    availablePosition?: string;
    experienceRequired?: string;
    educationRequired?: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    has_applied?: boolean;
    isActive?: boolean;
    deadline?: Date;
}

function JobApplicationsPage() {
    const navigate = useNavigate();
    const [jobsApplicationsData, setJobApplicationsData] = useState<
    IJob[]
    >([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const JOBS_PER_PAGE: number = 2;

    const fetchJobApplications = async (currentPage: number) => {
        const jobsApplicationsData: IResponse = await getAllJobsApplicationsForRecruiterApi(
            currentPage,
            JOBS_PER_PAGE
        );
        setJobApplicationsData(jobsApplicationsData.data.applications);
        setNumberOfPages(jobsApplicationsData.data.numberOfPages);
    };

    useEffect(() => {
        fetchJobApplications(1); // Fetch initial data for the first page
    }, []);


    const viewApplicationDetails = async (jobId: string) => {
        navigate(`/recruiter/application-details/${jobId}`);
    };

    const columns = [
        { Header: "Candidate", accessor: "candidateId.name" },
        { Header: "Email", accessor: "candidateId.email" },
        { Header: "Job Title", accessor: "jobId.title", },
        { Header: "Application Status", button:  (row: { applicationStatus: string }) => (
            <div
                className={`badge ${
                    row?.applicationStatus == "Applied"
                        ? "badge badge-accent  gap-2 w-24"
                        : row.applicationStatus == "Shortlisted"
                        ? "badge badge-success gap-2 w-24"
                        : "badge badge-error gap-2 w-24"
                } `}
            >
                {row?.applicationStatus}
            </div>
        ), },
        
        {
            Header: "Applied on",
            button :(row: { createdAt: string }) =>
                formatDate(row?.createdAt!),
        },{
            Header: "View",
            button:  (row: { id: string }) => (
                <button
                    onClick={() => {
                        viewApplicationDetails(row.id);
                    }}
                    className="btn btn-info btn-sm w-24"
                >
                    view details
                </button>
            ),
        },
    ];



    return (
        <div>
            <div className="flex items-center justify-center p-5">
                <h1 className="text-3xl font-bold">Job Applicants</h1>
            </div>

            {jobsApplicationsData.length > 0 ? (
                <div className="mx-14">
                     <Table
                        columns={columns}
                        data={jobsApplicationsData}
                        numberOfPages={numberOfPages}
                        fetchData={fetchJobApplications}
                    />
                </div>
            ) : (
                <div className="text-center text-7xl my-60 font-bold text-orange-800">
                    You haven't received any job applications yet
                </div>
            )}
        </div>
    );
}

export default JobApplicationsPage;
