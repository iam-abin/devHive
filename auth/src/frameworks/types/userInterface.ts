export interface UserDataSignup {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;
	otp: number
}

export interface UserDataSignin {
	email: string;
	password: string;
	userType: string;
}

export interface UpdatePasswordInput {
	id: string;
	password: string;
}