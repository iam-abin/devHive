import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";


export const getAllCandidatesApi = async (): Promise<IResponse> => {
    return await adminApiCalls("get", adminApiUrlConfig.getAllCandidatesUrl);
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
