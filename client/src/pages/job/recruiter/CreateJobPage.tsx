import { createJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/toastMessage";
import { IJob } from "../../../types/Job";
import CreateJobForm from "../../../components/form/CreateJobForm";
import { useEffect, useState } from "react";
import { recruiterGetProfileApi } from "../../../axios/apiMethods/profile-service/recruiter";
import {
    initialJobValues,
    jobSchema,
} from "../../../utils/validations/createJob";
import { IRecruiterProfileResponse } from "../../../types/profile";

function CreateJobPage() {
    const recruiterData = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const [recruiterProfileData, setecruiterProfileData] =
        useState<IRecruiterProfileResponse>();

    useEffect(() => {
        (async () => {
            if (recruiterData) {
                const recruiterProfile = await recruiterGetProfileApi();

                setecruiterProfileData(recruiterProfile.data);
                initialJobValues.companyName =
                    recruiterProfile.data.companyName;
                initialJobValues.companyLocation =
                    recruiterProfile.data.companyLocation;
            }
        })();
    }, [recruiterData]);

    const navigate = useNavigate();

    const handleSubmit = async (jobData: IJob) => {
        if (!recruiterProfileData?.companyName) {
            notify(
                "Please provide company details in your profile before creating a job!!!",
                "warning"
            );
            return;
        }
        const response = await createJobApi(jobData!);
        notify(response.message, "success");
        navigate("/recruiter/recruiter-added-jobs");
    };

    return (
        <>
            <div className="flex items-center justify-center bg-fuchsia-50">
                <CreateJobForm
                    initialJobValues={initialJobValues}
                    handleSubmit={handleSubmit}
                    recruiterData={recruiterProfileData!}
                    jobSchema={jobSchema}
                />
            </div>
        </>
    );
}

export default CreateJobPage;
