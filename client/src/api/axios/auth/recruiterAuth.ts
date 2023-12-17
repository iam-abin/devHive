import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_RECRUITER = `${BASE_URL}/auth/recruiter`;

export const recruiterSigninApi = async (data: any): Promise<any> => {
	console.log("in recruiter signin api");
	
		const response = await axios({
			method: "post",
			url: `${BASE_URL_RECRUITER}/signin`,
			data: data,
		});
		return response;
};


export const recruiterSignupApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_RECRUITER}/signup`,
			data: data,
		});
		return response;
};

export const  verifySignupOtpRecruiterApi = async (otp: any, email: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_RECRUITER}/verifyEmail`,
		data: {otp, email},
	});
	console.log("otp verify response is ", response);
	
	return response;
};
//--------------------------------------------------------------------------------------------


export const verifyForgotPasswordOtpCandidateApi = async (otp:string, email: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_RECRUITER}/verify-forgotPassword-otp`,
		data: {  otp, email },
	});
	console.log("response is ", response);
	
	return response;
};
//--------------------------------------------------------------------------------------------
export const passwordResetMobileRecruiterApi = async (email: string, phone: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_RECRUITER}/sendOtp`,
		data: { email, phone},
	});
	console.log("response is ", response);
	
	return response;
};

export const verifyResetPasswordOtpRecruiterApi = async (phone: string, otp:string, email: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_RECRUITER}/verifyOtp`,
		data: { phone, otp, email },
	});
	console.log("response is ", response);
	
	return response;
};

export const resetPasswordRecruiterApi = async (id:string, password: string): Promise<any> => {
	const response = await axios({
		method: "put",
		url: `${BASE_URL_RECRUITER}/resetPassword`,
		data: {id, password },
	});
	console.log("response is ", response);
	
	return response;
};
//--------------------------------------------------------------------------------------------

// export const emailRecruiterVerifyApi = async (url: string): Promise<any> => {
// 	const response = await axios({
// 		method: "post",
// 		url: url,
// 	});
// 	return response;
// };

export const recruiterSignoutApi = async(data: any): Promise<any> =>{
	console.log(data," in axios");
	
	const response = await axios({
		method: "post",
		url: `${BASE_URL_RECRUITER}/signout`,
		data: data,
	});
	return response;
}