import makeApiCall from "../../apiCalls";
import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import { IResponse } from "../../../types/api";


export const getAllMembershipPlansByCandidateApi = async (): Promise<IResponse> => {
    return await makeApiCall("get", paymentApiUrlConfig.getAllMembershipPlansUrl);
};