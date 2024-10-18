import { useEffect, useState } from "react";
import { getAnAppliedJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";
import { notify } from "../../../utils/toastMessage";

function JobApplicationDetailsPage() {
    const [jobApplicationDetails, setJobApplicationDetails] =
        useState<any>(null);
    const { jobApplicationId } = useParams();
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                if (jobApplicationId) {
                    const jobApplication = await getAnAppliedJobApi(
                        jobApplicationId
                    );

                    setJobApplicationDetails(jobApplication.data);
                }
            } catch (error: any) {
                notify(error.response.data.errors[0].message, "error");
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jobApplicationId]);
    return (
        <div>
            <TopNavBarCandidate />
            <JobApplicationDetails
                jobApplicationDetails={jobApplicationDetails}
                handleChangeApplicationStatus={undefined}
            />
            <Footer />
        </div>
    );
}

export default JobApplicationDetailsPage;
