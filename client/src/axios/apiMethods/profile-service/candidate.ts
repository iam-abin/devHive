
import profileApiUrlConfig from "../../../config/apiUrlsConfig/profileApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const candidateGetProfileApi = async (userId: string): Promise<any> => {
    console.log(userId);

    // try {
		const response: any = await candidateApiCalls("get", profileApiUrlConfig.getCandidateProfileUrl(userId), userId);
		console.log("response is ", response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }
    
    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_CANDIDATE}/viewProfile/${userId}`,
    // });
    
    // console.log(response.data);
    
    // return response;
};


export const updateCandidateProfileApi = async (candidateProfileData: any): Promise<any> => {
		const response: any = await candidateApiCalls("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);

        console.log(candidateProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
};

export const uploadCandidateResumeProfileApi = async (resumeData: any, headers: any): Promise<any> => {
    const response: any = await candidateApiCalls("put", profileApiUrlConfig.uploadCandidateResumeUrl, {resumeData});

    console.log(resumeData);
    console.log("response is ", response.data);

    return response.data;
};