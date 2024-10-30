
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";

export const getAllJobsAdminApi = async (page: number, limit: number): Promise<IResponse> => { // for admin from job in admin service
    return await makeApiCall("get", adminApiUrlConfig.getAllJobsUrl(page, limit));
};

export const blockUnblockJobApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("put", adminApiUrlConfig.blockUnblockJobUrl(jobId));
};

export const viewJobDetailsApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.getAJobAdminUrl(jobId));
};