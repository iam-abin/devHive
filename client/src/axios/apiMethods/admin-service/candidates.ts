import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";


export const getAllCandidatesApi = async (page: number, limit: number): Promise<IResponse> => {
    return await adminApiCalls("get", adminApiUrlConfig.getAllCandidatesUrl(page, limit));
};

export const blockUnblockCandidateApi = async (
    userId: string
): Promise<IResponse> => {
    return await adminApiCalls(
        "put",
        adminApiUrlConfig.blockUnblockCandidateUrl(userId)
    );
};

export const viewCandidateProfileDetailsApi = async (
    userId: string
): Promise<IResponse> => {
    return await adminApiCalls(
        "get",
        adminApiUrlConfig.viewCandidateProfileDetailsUrl(userId)
    );
};
