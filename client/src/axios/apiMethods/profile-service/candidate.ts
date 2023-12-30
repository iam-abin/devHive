
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
    // try {
		const response: any = await candidateApiCalls("patch", profileApiUrlConfig.updateCandidateProfileUrl, candidateProfileData);

        console.log(candidateProfileData.userId);
		console.log("response is ", response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "patch",
    //     url: `${BASE_URL_CANDIDATE}/updateProfile`,
    //     data: recruiterProfileData
    // });

    // console.log(recruiterProfileData.userId);
    
    // console.log(response.data);
    
    // return response;
};