export interface IUserDataSignup {
	name: string;
	email: string;
	phone: number;
	password: string;
	userType: string;
	// isPremiumUser: boolean
	otp: number
}

export interface IUserDataSignin {
	email: string;
	password: string;
	userType: string;
}

export interface IUpdatePasswordInput {
	id: string;
	password: string;
}