import React, { useEffect, useState } from "react";
import AdminViewJobDetailsCard from "../../../components/cards/AdminViewJobDetailsCard";
import { useParams } from "react-router-dom";
import {
    blockUnblockJobApi,
    viewJobDetailsApi,
} from "../../../axios/apiMethods/admin-service/job";
import { notify } from "../../../utils/toastMessage";
import { swal } from "../../../utils/swal";
import { IResponse } from "../../../types/api";
import { IJob } from "../../../types/Job";

const ViewJobDetailsPage: React.FC = () => {
    const { jobId } = useParams();

    const [jobDetails, setJobDetails] = useState<IJob | {}>();

    useEffect(() => {
        (async () => {
            const job = await viewJobDetailsApi(jobId!);
            setJobDetails(job.data);
        })();
    }, [jobId]);

    const handleBlockUnblock = async (jobId: string, isActive: boolean) => {
        swal(
            `Do you want to ${isActive ? "block" : "unblock"} this Job?`,
            "Yes, Block"
        ).then(async (result) => {
            if (result.isConfirmed) {
                const updatedJob: IResponse = await blockUnblockJobApi(jobId);
                if (updatedJob) {
                    notify(updatedJob.message, "success");
                }

                 setJobDetails((prevDetails: IJob | {}) => ({
                    ...prevDetails,
                    ...updatedJob.data,
                }));
            }
        });
    };

    return (
        <AdminViewJobDetailsCard
            data={jobDetails}
            handleBlockUnblock={handleBlockUnblock}
        />
    );
};

export default ViewJobDetailsPage;
