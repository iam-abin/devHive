import candidateApiCalls from "../../candidate/apiCalls";
import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import { IResponse } from "../../../types/api";


export const getAllMembershipPlansByCandidateApi = async (): Promise<IResponse> => {
    return await candidateApiCalls("get", paymentApiUrlConfig.getAllMembershipPlansUrl);
};