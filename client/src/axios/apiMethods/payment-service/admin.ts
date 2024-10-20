import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";
import adminApiCalls from "../../admin/apiCalls";

export const getAllPaymentsApi = async (): Promise<IResponse> => {
    return await adminApiCalls("get", adminApiUrlConfig.getAllPaymentsUrl);
};
