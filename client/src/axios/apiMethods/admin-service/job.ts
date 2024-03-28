
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import adminApiCalls from "../../admin/apiCalls";

export const getAllJobsAdminApi = async (): Promise<any> => { // for admin from job in admin service
    const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllJobsUrl);
    return response.data;
};

export const blockUnblockJobApi = async (jobId: string): Promise<any> => {
    const response: any = await adminApiCalls("put", adminApiUrlConfig.blockUnblockJobUrl(jobId));
    return response.data;
};

export const viewJobDetailsApi = async (jobId: any): Promise<any> => {
    const response: any = await adminApiCalls("get", jobApiUrlConfig.getAJobUrl(jobId));
    return response.data;
};