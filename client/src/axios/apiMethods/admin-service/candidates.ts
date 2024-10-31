import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import { ISearch } from "../../../types/Job";
import makeApiCall from "../../apiCalls";


export const getAllCandidatesApi = async (page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.getAllCandidatesUrl(page, limit));
};

export const searchCandidatesApi = async (searchData: ISearch, page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.searchCandidatesUrl(searchData, page, limit));
};

export const blockUnblockCandidateApi = async (
    userId: string
): Promise<IResponse> => {
    return await makeApiCall(
        "put",
        adminApiUrlConfig.blockUnblockCandidateUrl(userId)
    );
};

export const viewCandidateProfileDetailsApi = async (
    userId: string
): Promise<IResponse> => {
    return await makeApiCall(
        "get",
        adminApiUrlConfig.viewCandidateProfileDetailsUrl(userId)
    );
};
