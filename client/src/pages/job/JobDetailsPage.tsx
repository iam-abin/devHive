import { useEffect, useState } from "react";
import {
    candidateApplyJobApi,
    changeJobCloseStatusApi,
    checkJobAppliedApi,
    getAJobApi,
} from "../../axios/apiMethods/jobs-service/jobs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JobDetails from "../../components/recruiter/JobDetails";
import { notify } from "../../utils/toastMessage";
import { swal } from "../../utils/swal";
import { IJob } from "../../types/Job";

function JobDetailsPage() {
    const [jobDetails, setJobDetails] = useState<IJob | null>(null);
    const [hasApplied, setHasApplied] = useState<boolean>(false);
    const navigate = useNavigate();
    const { jobId } = useParams();
    const locationUrl = useLocation();

    const isCandidateUrl: boolean = locationUrl.pathname.includes("candidate");
    const userType = isCandidateUrl ? "candidate" : "recruiter";

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (jobId) {
                const job = await getAJobApi(jobId);
                setJobDetails(job.data);

                if (userType === "candidate") {
                    const hasApplied = await checkJobAppliedApi(jobId);
                    setHasApplied(hasApplied.data.isApplied);
                }
            }
        };

        fetchJobDetails();
    }, [jobId, userType]);

    // Candidate
    const handleApplyJob = async (jobId: string) => {
        swal("Do you want to Apply For this job?", "Are you sure!").then(
            async (result) => {
                if (result.isConfirmed) {
                    const response = await candidateApplyJobApi(jobId);

                    if (response) {
                        notify("Applied successfully", "success");
                    }
                }
            }
        );
    };

    // Recruiter
    const handleEditJob = async (jobId: string) => {
        navigate(`/recruiter/edit-job-details/${jobId}`);
    };

    const handleChangeJobCloseStatus = async (jobId: string) => {
        if (jobId) {
            swal(
                `Do you want to ${
                    jobDetails?.isActive ? "close" : "open"
                } this Job?`,
                `Yes, ${jobDetails?.isActive ? "close job" : "open job"}`
            ).then(async (result) => {
                if (result.isConfirmed) {
                    const job = await changeJobCloseStatusApi(jobId);
                    if (job) {
                        setJobDetails((prevDetails: IJob | null) => ({
                            ...prevDetails,
                            ...job.data,
                        }));

                        notify(job.message, "success");
                    }
                }
            });
        }
    };
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <JobDetails
            jobDetails={jobDetails}
            hasApplied={hasApplied}
            handleApplyJob={handleApplyJob}
            handleEditJob={handleEditJob}
            handleChangeJobCloseStatus={handleChangeJobCloseStatus}
            handleGoBack={handleGoBack}
        />
    );
}

export default JobDetailsPage;