import { useEffect, useState } from "react";
import { getAnAppliedJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../components/footer/Footer";

function JobApplicationDetailsPage() {
    const [jobApplicationDetails, setJobApplicationDetails] =
        useState<any>(null);
    const { jobApplicationId } = useParams();
    useEffect(() => {
        const fetchJobDetails = async () => {
                if (jobApplicationId) {
                    const jobApplication = await getAnAppliedJobApi(
                        jobApplicationId
                    );

                    setJobApplicationDetails(jobApplication.data);
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
