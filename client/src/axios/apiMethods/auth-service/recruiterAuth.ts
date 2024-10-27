
import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";


export const recruiterSigninApi = async (data: any): Promise<IResponse> => {
	return await makeApiCall("post", authApiUrlConfig.signinRecruiterUrl, data);
};


export const recruiterSignupApi = async (data: any): Promise<IResponse> => {
	return await makeApiCall("post", authApiUrlConfig.signupRecruiterUrl, data);
};

export const  verifySignupOtpRecruiterApi = async (otp: string, email: string): Promise<IResponse> => {
	return await makeApiCall("post", authApiUrlConfig.verifySignupOtpRecruiterUrl, {otp, email});
};

export const passwordResetMobileRecruiterApi = async (email: string, phone: string): Promise<IResponse> => {
	return await makeApiCall("post", authApiUrlConfig.passwordResetMobileRecruiterUrl, { email, phone});
};

export const verifyResetPasswordOtpRecruiterApi = async (phone: string, otp:string, email: string): Promise<IResponse> => {
		return await makeApiCall("post", authApiUrlConfig.verifyResetPasswordOtpRecruiterUrl, { phone, otp, email });
};

export const resetPasswordRecruiterApi = async (userId:string, password: string): Promise<IResponse> => {
	return await makeApiCall("put", authApiUrlConfig.resetPasswordRecruiterUrl,  {userId, password });
};

export const forgotPasswordEmailRecruiterApi = async (email: string): Promise<IResponse> => {
	return await makeApiCall("post", authApiUrlConfig.forgotPasswordEmailRecruiterUrl,  { email });
};

export const verifyForgotPasswordOtpRecruiterApi = async (otp:string, email: string): Promise<IResponse> => {
	return await makeApiCall("post", authApiUrlConfig.verifyForgotPasswordOtpRecruiterUrl,  {  otp, email });
};

export const forgotPasswordRecruiterApi = async (userId:string, password: string): Promise<IResponse> => {
	return await makeApiCall("put", authApiUrlConfig.forgotPasswordRecruiterUrl, {userId, password });
};

export const recruiterSignoutApi = async(data: any): Promise<IResponse> =>{
	return await makeApiCall("post", authApiUrlConfig.signoutRecruiterUrl, data);
}