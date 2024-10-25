import { useEffect, useState } from "react";
import { getAJobApplicationApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useParams } from "react-router-dom";
import JobApplicationDetails from "../../../components/recruiter/JobApplicationDetails";

function JobApplicationDetailsPage() {
    const [jobApplicationDetails, setJobApplicationDetails] =
        useState<any>(null);

    const { jobApplicationId } = useParams();
    useEffect(() => {
        const fetchJobDetails = async () => {
            if (jobApplicationId) {
                const jobApplication = await getAJobApplicationApi(
                    jobApplicationId
                );

                setJobApplicationDetails(jobApplication.data);
            }
        };

        fetchJobDetails();
    }, [jobApplicationId]);

    return (
        <div>
            <JobApplicationDetails
                jobApplicationDetails={jobApplicationDetails}
                handleChangeApplicationStatus={undefined}
            />
        </div>
    );
}

export default JobApplicationDetailsPage;
