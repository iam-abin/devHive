
import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";


export const candidateSigninApi = async (data: any): Promise<any> => {

	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.signinCandidateUrl, data);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error: any) {
	// 	console.log(error);
	// 	throw new Error(error.response?.data?.message)
		
	// }
		// const response = await axios({
		// 	method: "post",
		// 	url: `${BASE_URL_CANDIDATE}/signin`,
		// 	data: data,
		// });
        // console.log(response);
        
		// return response;
};


export const candidateSignupApi = async (data: any): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.signupCandidateUrl, data);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }
		// const response = await axios({
		// 	method: "post",
		// 	url: `${BASE_URL_CANDIDATE}/signup`,
		// 	data: data,
		// });
		// return response;
};

export const  verifySignupOtpCandidateApi = async (otp: any, email: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.verifySignupOtpCandidateUrl, {otp,email});
		console.log("otp verify response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_CANDIDATE}/verifyEmail`,
	// 	data: {otp, email},
	// });
	// console.log("otp verify response is ", response);
	
	// return response;
};


//--------------------------------------------------------------------------------------------
export const passwordResetMobileCandidateApi = async (email: string, phone: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.passwordResetMobileCandidateUrl, {email, phone});
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }


	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_CANDIDATE}/sendOtp`,
	// 	data: { email, phone},
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const verifyResetPasswordOtpCandidateApi = async (phone: string, otp:string, email: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.verifyResetPasswordOtpCandidateUrl, { phone, otp, email });
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }


	// const response = await axios({
	// 	method: "post",in setcandidate reducer payload", action.payload
	// 	url: `${BASE_URL_CANDIDATE}/verifyOtp`,
	// 	data: { phone, otp, email },
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const resetPasswordCandidateApi = async (id:string, password: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("put", authApiUrlConfig.resetPasswordCandidateUrl, {id, password });
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "put",
	// 	url: `${BASE_URL_CANDIDATE}/resetPassword`,
	// 	data: {id, password },
	// });
	// console.log("response is ", response);
	
	// return response;
};
//--------------------------------------------------------------------------------------------


// ================================================================================================

export const forgotPasswordEmailCandidateApi = async (email: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.forgotPasswordEmailCandidateUrl, { email });
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }


	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_OTP}/sendOtp`,
	// 	data: { email},
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const verifyForgotPasswordOtpCandidateApi = async (otp:string, email: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.verifyForgotPasswordOtpCandidateUrl, {  otp, email });
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_OTP}/verify-forgotPassword-otp`,
	// 	data: {  otp, email },
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const forgotPasswordCandidateApi = async (userId:string, password: string): Promise<any> => {
	// try {
		const response: any = await candidateApiCalls("put", authApiUrlConfig.forgotPasswordCandidateUrl, {id: userId, password });
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "put",
	// 	url: `${BASE_URL_CANDIDATE}/forgotPassword`,
	// 	data: {id: userId, password },
	// });
	// console.log("response is ", response);
	
	// return response;
};


// ================================================================================================


export const candidateSignoutApi = async(data: any): Promise<any> =>{
	// try {
		const response: any = await candidateApiCalls("post", authApiUrlConfig.signoutCandidateUrl, data);
		console.log("response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// console.log(data," in axios");
	
	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_CANDIDATE}/signout`,
	// 	data: data,
	// });
	// return response;
}
