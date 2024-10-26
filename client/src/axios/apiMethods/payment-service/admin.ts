import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";

export const getAllPaymentsApi = async (page: number, limit: number): Promise<IResponse> => {
    return await adminApiCalls("get", adminApiUrlConfig.getAllPaymentsUrl(page, limit));
};
