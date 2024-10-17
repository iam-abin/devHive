
import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";



export const candidateSigninApi = async (data: any): Promise<any> => {
	console.log("a", data);
	
	const response: any = await candidateApiCalls("post", authApiUrlConfig.signinCandidateUrl, data);
	console.log("b");
	return response.data;
};

export const candidateSignupApi = async (data: any): Promise<any> => {
	const response: any = await candidateApiCalls("post", authApiUrlConfig.signupCandidateUrl, data);
	return response.data;
};

export const  verifySignupOtpCandidateApi = async (otp: any, email: string): Promise<any> => {
	const response: any = await candidateApiCalls("post", authApiUrlConfig.verifySignupOtpCandidateUrl, {otp,email});
	return response.data;
};

export const passwordResetMobileCandidateApi = async (email: string, phone: string): Promise<any> => {
	const response: any = await candidateApiCalls("post", authApiUrlConfig.passwordResetMobileCandidateUrl, {email, phone});
	return response.data;
};

export const verifyResetPasswordOtpCandidateApi = async (phone: string, otp:string, email: string): Promise<any> => {
	const response: any = await candidateApiCalls("post", authApiUrlConfig.verifyResetPasswordOtpCandidateUrl, { phone, otp, email });
	return response.data;
};

export const resetPasswordCandidateApi = async (userId:string, password: string): Promise<any> => {
	const response: any = await candidateApiCalls("put", authApiUrlConfig.resetPasswordCandidateUrl, {userId, password });
	return response.data;
};


export const forgotPasswordEmailCandidateApi = async (email: string): Promise<any> => {
	const response: any = await candidateApiCalls("post", authApiUrlConfig.forgotPasswordEmailCandidateUrl, { email });
	return response.data;
};

export const verifyForgotPasswordOtpCandidateApi = async (otp:string, email: string): Promise<any> => {
	const response: any = await candidateApiCalls("post", authApiUrlConfig.verifyForgotPasswordOtpCandidateUrl, {  otp, email });
	return response.data;
};

export const forgotPasswordCandidateApi = async (userId:string, password: string): Promise<any> => {
	const response: any = await candidateApiCalls("put", authApiUrlConfig.forgotPasswordCandidateUrl, {userId, password });	
	return response.data;
};

export const candidateSignoutApi = async(data: any): Promise<any> =>{
	const response: any = await candidateApiCalls("post", authApiUrlConfig.signoutCandidateUrl, data);
	return response.data;
}
