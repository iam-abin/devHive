
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";

export const getAllJobsAdminApi = async (page: number, limit: number): Promise<IResponse> => { // for admin from job in admin service
    return await adminApiCalls("get", adminApiUrlConfig.getAllJobsUrl(page, limit));
};

export const blockUnblockJobApi = async (jobId: string): Promise<IResponse> => {
    return await adminApiCalls("put", adminApiUrlConfig.blockUnblockJobUrl(jobId));
};

export const viewJobDetailsApi = async (jobId: string): Promise<IResponse> => {
    return await adminApiCalls("get", jobApiUrlConfig.getAJobUrl(jobId));
};