
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const recruiterGetProfileApi = async (userId: string): Promise<any> => {
    console.log(userId);

    try {
		const response: any = await recruiterApiCalls("post", profileApiUrlConfig.getgetRecruiterProfileUrl(userId), userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}

    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_RECRUITER}/viewProfile/${userId}`,
    // });
    // console.log(userId);
    
    // console.log(response.data);
    
    // return response;
};


export const updateRecruiterProfileApi = async (recruiterProfileData: any): Promise<any> => {
    try {
		const response: any = await recruiterApiCalls("patch", profileApiUrlConfig.updateCandidateProfileUrl, recruiterProfileData);

        console.log(recruiterProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
	} catch (error) {
		console.log(error);
		
	}

    // const response = await axios({
    //     method: "patch",
    //     url: `${BASE_URL_RECRUITER}/updateProfile`,
    //     data: recruiterProfileData
    // });
    // console.log(recruiterProfileData.userId);
    
    // console.log(response.data);
    
    // return response;
};
