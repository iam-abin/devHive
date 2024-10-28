import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";

export const getAllPaymentsApi = async (page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.getAllPaymentsUrl(page, limit));
};
