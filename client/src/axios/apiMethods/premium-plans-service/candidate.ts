import candidateApiCalls from "../../candidate/apiCalls";
import paymentApiUrlConfig from "../../../config/apiUrlsConfig/paymentApiUrlConfig";


export const getAllMembershipPlansByCandidateApi = async (): Promise<any> => {
    const response: any = await candidateApiCalls("get", paymentApiUrlConfig.getAllMembershipPlansUrl);
    console.log("response is",response.data);

    return response.data;

};