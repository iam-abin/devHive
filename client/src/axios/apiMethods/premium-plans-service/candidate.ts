import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const getAllMembershipPlansByCandidateApi = async (): Promise<any> => {
    const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllMembershipPlansUrl);
    console.log("response is",response.data);

    return response.data;

};