import { useEffect, useState } from "react";
import EditJob from "../../../components/form/EditJob";
import { useNavigate, useParams } from "react-router-dom";
import {
    updateJobApi,
    getAJobRecruiterApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { notify } from "../../../utils/toastMessage";
import { IJob } from "../../../types/Job";
import { IResponse } from "../../../types/api";

function EditJobPage() {
    const [jobDetails, setJobDetails] = useState<any>(null);
    const navigate = useNavigate();
    const { jobId } = useParams();

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (jobId) {
                const job: IResponse = await getAJobRecruiterApi(jobId);
                setJobDetails(job.data);
            }
        };

        fetchJobDetails();
    }, [jobId]);
    if (!jobDetails) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (jobData: Partial<IJob>) => {
        const data = await updateJobApi(jobId!, jobData);

        if (data.data) {
            notify("updated successfully", "success");
            navigate("/recruiter/recruiter-added-jobs");
        } else {
            notify("not updated", "error");
        }
    };

    const initialJobValues: Partial<IJob> = {
        title: jobDetails?.title ?? "",
        jobDescription: jobDetails?.jobDescription ?? "",
        skills: jobDetails?.skills ?? [],
        availablePosition: jobDetails?.availablePosition ?? 0,
        experienceRequired: jobDetails?.experienceRequired ?? "",
        educationRequired: jobDetails?.educationRequired ?? "",
        employmentType: jobDetails?.employmentType,
        salaryMin: jobDetails?.salaryMin ?? 0,
        salaryMax: jobDetails?.salaryMax ?? 0,
        deadline:
            new Date(jobDetails?.deadline).toLocaleDateString("en-CA") ?? "",
    };

    return (
        <div>
            <div className="flex items-center justify-center h-full bg-fuchsia-50 ">
                <EditJob
                    initialJobValues={initialJobValues}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default EditJobPage;
