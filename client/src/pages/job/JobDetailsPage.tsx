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
import TopNavBarCandidate from "../../components/navBar/TopNavBar";
import Footer from "../../components/footer/Footer";
import { swal } from "../../utils/swal";

function JobDetailsPage() {
    const [jobDetails, setJobDetails] = useState<any>(null);
    const [hasApplied, setHasApplied] = useState<any>(false);
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
    }, [jobId]);

    // Candidate
    const handleApplyJob = async (jobId: string) => {
        swal("Do you want to Apply For this job?").then(async (result) => {
            if (result.isConfirmed) {
                const response = await candidateApplyJobApi(jobId);

                if (response) {
                    notify("Applied successfully", "success");
                }
            }
        });
    };

    // Recruiter
    const handleEditJob = async (id: string) => {
        navigate(`/recruiter/edit-job-details/${id}`);
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
                        setJobDetails({
                            ...jobDetails,
                            isActive: job.data.isActive,
                        });

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
        <div>
            {userType === "candidate" && <TopNavBarCandidate />}
            <JobDetails
                jobDetails={jobDetails}
                hasApplied={hasApplied}
                handleApplyJob={handleApplyJob}
                handleEditJob={handleEditJob}
                handleChangeJobCloseStatus={handleChangeJobCloseStatus}
                handleGoBack={handleGoBack}
            />
            {userType === "candidate" && <Footer />}
        </div>
    );
}

export default JobDetailsPage;
