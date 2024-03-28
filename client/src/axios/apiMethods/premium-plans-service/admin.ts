import adminApiCalls from "../../admin/apiCalls";
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";




export const createMembershipPlanApi = async (membershipPlanData: any): Promise<any> => {
		const response: any = await adminApiCalls("post", adminApiUrlConfig.createMembershipPlanUrl, membershipPlanData);
		return response.data;
};



export const blockUnblockMembershipPlanApi = async (
	membershipPlanId: string
): Promise<any> => {
	const response: any = await adminApiCalls(
		"put",
		adminApiUrlConfig.blockUnblockMembershipPlanUrl(membershipPlanId)
	);
	return response.data;
};



export const getAMembershipPlanApi = async (membershipPlanId: any): Promise<any> => {
    const response: any = await adminApiCalls("get", adminApiUrlConfig.getAMembershipPlanUrl(membershipPlanId));
    return response.data;
};

export const getAllMembershipPlansApi = async (): Promise<any> => {
    const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllMembershipPlansUrl);
    return response.data;

};

export const updateJobApi = async (data: any): Promise<any> => {
    const response: any = await adminApiCalls("patch", adminApiUrlConfig.updateMembershipPlanUrl, data);
    return response.data;
};
