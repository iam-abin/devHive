import adminApiCalls from "../../admin/apiCalls";
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";
import { IResponse } from "../../../types/api";




export const createMembershipPlanApi = async (membershipPlanData: any): Promise<IResponse> => {
		return await adminApiCalls("post", adminApiUrlConfig.createMembershipPlanUrl, membershipPlanData);
};



export const blockUnblockMembershipPlanApi = async (
	membershipPlanId: string
): Promise<IResponse> => {
	return await adminApiCalls( "put", adminApiUrlConfig.blockUnblockMembershipPlanUrl(membershipPlanId));
};



export const getAMembershipPlanApi = async (membershipPlanId: any): Promise<IResponse> => {
    return await adminApiCalls("get", adminApiUrlConfig.getAMembershipPlanUrl(membershipPlanId));
};

export const getAllMembershipPlansApi = async (page: number, limit: number): Promise<IResponse> => {
    return await adminApiCalls("get", adminApiUrlConfig.getAllMembershipPlansUrl(page, limit));

};

export const updateJobApi = async (data: any): Promise<IResponse> => {
    return await adminApiCalls("patch", adminApiUrlConfig.updateMembershipPlanUrl, data);
};
