import { useEffect, useState } from "react";
import { getAnAppliedJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";

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
        <JobApplicationDetails
            jobApplicationDetails={jobApplicationDetails}
            handleChangeApplicationStatus={undefined}
        />
    );
}

export default JobApplicationDetailsPage;
