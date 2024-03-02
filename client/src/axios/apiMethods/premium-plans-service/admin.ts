import adminApiCalls from "../../admin/apiCalls";
import adminApiUrlConfig from "../../../config/apiUrlsConfig/adminServiceApiUrlConfig";




export const createMembershipPlanApi = async (membershipPlanData: any): Promise<any> => {
    console.log("iside candidateGetProfileApi ",membershipPlanData);
		const response: any = await adminApiCalls("post", adminApiUrlConfig.createMembershipPlanUrl, membershipPlanData);
		console.log("response is ", response.data);
	
		return response.data;
};



export const blockUnblockMembershipPlanApi = async (
	membershipPlanId: string
): Promise<any> => {
	console.log("blockUnblockMembershipPlanApi");
	const response: any = await adminApiCalls(
		"put",
		adminApiUrlConfig.blockUnblockMembershipPlanUrl(membershipPlanId)
	);
	console.log("response is", response);

	return response.data;
};



export const getAMembershipPlanApi = async (membershipPlanId: any): Promise<any> => {
    const response: any = await adminApiCalls("get", adminApiUrlConfig.getAMembershipPlanUrl(membershipPlanId));
    console.log("response is",response.data);

    return response.data;

};

export const getAllMembershipPlansApi = async (): Promise<any> => {
    const response: any = await adminApiCalls("get", adminApiUrlConfig.getAllMembershipPlansUrl);
    console.log("response is",response.data);

    return response.data;

};

export const updateJobApi = async (data: any): Promise<any> => {
    console.log("updateJobApi data ",data);
    const response: any = await adminApiCalls("patch", adminApiUrlConfig.updateMembershipPlanUrl, data);
    console.log("response is",response);
    console.log("response data is",response.data);
    return response.data;
};
