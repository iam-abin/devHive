
import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const recruiterSigninApi = async (data: any): Promise<any> => {
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.signinRecruiterUrl, data);
	return response.data
};


export const recruiterSignupApi = async (data: any): Promise<any> => {
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.signupRecruiterUrl, data);
	return response.data;
};

export const  verifySignupOtpRecruiterApi = async (otp: any, email: string): Promise<any> => {
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.verifySignupOtpRecruiterUrl, {otp, email});
	return response.data;
};

export const passwordResetMobileRecruiterApi = async (email: string, phone: string): Promise<any> => {
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.passwordResetMobileRecruiterUrl, { email, phone});
	return response.data;
};

export const verifyResetPasswordOtpRecruiterApi = async (phone: string, otp:string, email: string): Promise<any> => {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.verifyResetPasswordOtpRecruiterUrl, { phone, otp, email });
		return response.data;
};

export const resetPasswordRecruiterApi = async (id:string, password: string): Promise<any> => {
	const response: any = await recruiterApiCalls("put", authApiUrlConfig.resetPasswordRecruiterUrl,  {id, password });
	return response.data;	
};

export const forgotPasswordEmailRecruiterApi = async (email: string): Promise<any> => {
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.forgotPasswordEmailRecruiterUrl,  { email });
	return response.data;
};

export const verifyForgotPasswordOtpRecruiterApi = async (otp:string, email: string): Promise<any> => {
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.verifyForgotPasswordOtpRecruiterUrl,  {  otp, email });
	return response.data;
};

export const forgotPasswordRecruiterApi = async (userId:string, password: string): Promise<any> => {
	const response: any = await recruiterApiCalls("put", authApiUrlConfig.forgotPasswordRecruiterUrl, {id: userId, password });
	return response.data;
};

export const recruiterSignoutApi = async(data: any): Promise<any> =>{
	const response: any = await recruiterApiCalls("post", authApiUrlConfig.signoutRecruiterUrl, data);
	return response.data;
}