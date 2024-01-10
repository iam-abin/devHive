
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const recruiterGetProfileApi = async (userId: string): Promise<any> => {
    console.log(userId);

    try {
		const response: any = await recruiterApiCalls("get", profileApiUrlConfig.getgetRecruiterProfileUrl(userId), userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}
};


export const updateRecruiterProfileApi = async (recruiterProfileData: any): Promise<any> => {
    try {
		const response: any = await recruiterApiCalls("patch", profileApiUrlConfig.updategetRecruiterProfileUrl, recruiterProfileData);

        console.log(recruiterProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}

};

export const getACandidateProfileApi = async (userId: any): Promise<any> => {
    try {
		const response: any = await recruiterApiCalls("get", profileApiUrlConfig.getACandidateProfileUrl(userId));

        // console.log(recruiterProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}

};

export const getAllCandidatesProfilesApi = async (page: any): Promise<any> => {
    try {
		const response: any = await recruiterApiCalls("get", profileApiUrlConfig.getAllCandidatesProfilesUrl(page));

        // console.log(recruiterProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}

};
