import axios from "axios";
import { BASE_URL } from "../../../config/baseUrl";

const BASE_URL_CANDIDATE = `${BASE_URL}/auth/candidate`;

export const candidateSigninApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_CANDIDATE}/signin`,
			data: data,
		});
        console.log(response);
        
		return response;
};


export const candidateSignupApi = async (data: any): Promise<any> => {
		const response = await axios({
			method: "post",
			url: `${BASE_URL_CANDIDATE}/signup`,
			data: data,
		});
		return response;
};

export const verifySignupOtpCandidateApi = async (otp: any, email: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_CANDIDATE}/verifyEmail`,
		data: {otp, email},
	});
	console.log("response is ", response);
	
	return response;
};

//--------------------------------------------------------------------------------------------
export const passwordResetMobileCandidateApi = async (email: string, phone: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_CANDIDATE}/sendOtp`,
		data: { email, phone},
	});
	console.log("response is ", response);
	
	return response;
};

export const verifyResetPasswordOtpCandidateApi = async (phone: string, otp:string, email: string): Promise<any> => {
	const response = await axios({
		method: "post",
		url: `${BASE_URL_CANDIDATE}/verifyOtp`,
		data: { phone, otp, email },
	});
	console.log("response is ", response);
	
	return response;
};

export const resetPasswordCandidateApi = async (password:string, email: string): Promise<any> => {
	const response = await axios({
		method: "put",
		url: `${BASE_URL_CANDIDATE}/resetPassword`,
		data: {password, email },
	});
	console.log("response is ", response);
	
	return response;
};
//--------------------------------------------------------------------------------------------

// export const emailVerifyApi = async (url: string): Promise<any> => {
// 	const response = await axios({
// 		method: "post",
// 		url: url,
// 	});
// 	return response;
// };

export const candidateSignoutApi = async(data: any): Promise<any> =>{
	console.log(data," in axios");
	
	const response = await axios({
		method: "post",
		url: `${BASE_URL_CANDIDATE}/signout`,
		data: data,
	});
	return response;
}
