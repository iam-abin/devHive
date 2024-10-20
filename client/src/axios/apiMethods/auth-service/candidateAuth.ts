
import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import { IResponse } from "../../../types/api";
import candidateApiCalls from "../../candidate/apiCalls";



export const candidateSigninApi = async (data: any): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.signinCandidateUrl, data);
};

export const candidateSignupApi = async (data: any): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.signupCandidateUrl, data);
};

export const  verifySignupOtpCandidateApi = async (otp: string, email: string): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.verifySignupOtpCandidateUrl, {otp,email});
};

export const passwordResetMobileCandidateApi = async (email: string, phone: string): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.passwordResetMobileCandidateUrl, {email, phone});
};

export const verifyResetPasswordOtpCandidateApi = async (phone: string, otp:string, email: string): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.verifyResetPasswordOtpCandidateUrl, { phone, otp, email });
};

export const resetPasswordCandidateApi = async (userId:string, password: string): Promise<IResponse> => {
	return await candidateApiCalls("put", authApiUrlConfig.resetPasswordCandidateUrl, {userId, password });
};


export const forgotPasswordEmailCandidateApi = async (email: string): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.forgotPasswordEmailCandidateUrl, { email });
};

export const verifyForgotPasswordOtpCandidateApi = async (otp:string, email: string): Promise<IResponse> => {
	return await candidateApiCalls("post", authApiUrlConfig.verifyForgotPasswordOtpCandidateUrl, {  otp, email });
};

export const forgotPasswordCandidateApi = async (userId:string, password: string): Promise<IResponse> => {
	return await candidateApiCalls("put", authApiUrlConfig.forgotPasswordCandidateUrl, {userId, password });	
};

export const candidateSignoutApi = async(data: any): Promise<IResponse> =>{
	return await candidateApiCalls("post", authApiUrlConfig.signoutCandidateUrl, data);
}
