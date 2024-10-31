
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";


export const searchApi = async (searchKey: string, resourceType: string ,page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.getSearchResultsUrl(searchKey, resourceType, page, limit));
};
