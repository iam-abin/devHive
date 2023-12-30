
import authApiUrlConfig from "../../../config/apiUrlsConfig/authApiUrlConfig";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const recruiterSigninApi = async (data: any): Promise<any> => {
	console.log("in recruiter signin api");

	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.signinRecruiterUrl, data);
		console.log("response is",response.data);
	
		return response.data
	// } catch (error) {
	// 	console.log(" in recrutierApiCall errorr/////////////");
		
	// 	console.log(error);
		
	// }

	// console.log("in recruiter signin api");
	
	// 	const response = await axios({
	// 		method: "post",
	// 		url: `${BASE_URL_RECRUITER}/signin`,
	// 		data: data,
	// 	});
	// 	return response;
};


export const recruiterSignupApi = async (data: any): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.signupRecruiterUrl, data);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

		// const response = await axios({
		// 	method: "post",
		// 	url: `${BASE_URL_RECRUITER}/signup`,
		// 	data: data,
		// });
		// return response;
};

export const  verifySignupOtpRecruiterApi = async (otp: any, email: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.verifySignupOtpRecruiterUrl, {otp, email});
		console.log("otp verify response is ", response);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_RECRUITER}/verifyEmail`,
	// 	data: {otp, email},
	// });
	// console.log("otp verify response is ", response);
	
	// return response;
};

// ================================================================================================


//--------------------------------------------------------------------------------------------
export const passwordResetMobileRecruiterApi = async (email: string, phone: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.passwordResetMobileRecruiterUrl, { email, phone});
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_RECRUITER}/sendOtp`,
	// 	data: { email, phone},
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const verifyResetPasswordOtpRecruiterApi = async (phone: string, otp:string, email: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.verifyResetPasswordOtpRecruiterUrl, { phone, otp, email });
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_RECRUITER}/verifyOtp`,
	// 	data: { phone, otp, email },
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const resetPasswordRecruiterApi = async (id:string, password: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("put", authApiUrlConfig.resetPasswordRecruiterUrl,  {id, password });
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "put",
	// 	url: `${BASE_URL_RECRUITER}/resetPassword`,
	// 	data: {id, password },
	// });
	// console.log("response is ", response);
	
	// return response;
};
//--------------------------------------------------------------------------------------------

// ================================================================================================
export const forgotPasswordEmailRecruiterApi = async (email: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.forgotPasswordEmailRecruiterUrl,  { email });
		console.log("response is",response.data);
	
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

export const verifyForgotPasswordOtpRecruiterApi = async (otp:string, email: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.verifyForgotPasswordOtpRecruiterUrl,  {  otp, email });
		console.log("response is",response.data);
	
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

export const forgotPasswordRecruiterApi = async (userId:string, password: string): Promise<any> => {
	// try {
		const response: any = await recruiterApiCalls("put", authApiUrlConfig.forgotPasswordRecruiterUrl, {id: userId, password });
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// const response = await axios({
	// 	method: "put",
	// 	url: `${BASE_URL_RECRUITER}/forgotPassword`,
	// 	data: {id: userId, password },
	// });
	// console.log("response is ", response);
	
	// return response;
};

export const recruiterSignoutApi = async(data: any): Promise<any> =>{
	console.log(data," in signout api");
	// try {
		const response: any = await recruiterApiCalls("post", authApiUrlConfig.signoutRecruiterUrl, data);
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

	// console.log(data," in axios");
	
	// const response = await axios({
	// 	method: "post",
	// 	url: `${BASE_URL_RECRUITER}/signout`,
	// 	data: data,
	// });
	// return response;
}