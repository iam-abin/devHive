import makeApiCall from "../../apiCalls";
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";


export const createMembershipPlanApi = async (membershipPlanData: any): Promise<IResponse> => {
		return await makeApiCall("post", adminApiUrlConfig.createMembershipPlanUrl, membershipPlanData);
};

export const blockUnblockMembershipPlanApi = async (
	membershipPlanId: string
): Promise<IResponse> => {
	return await makeApiCall( "put", adminApiUrlConfig.blockUnblockMembershipPlanUrl(membershipPlanId));
};

export const getAMembershipPlanApi = async (membershipPlanId: any): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.getAMembershipPlanUrl(membershipPlanId));
};

export const getAllMembershipPlansApi = async (page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", adminApiUrlConfig.getAllMembershipPlansUrl(page, limit));
};
