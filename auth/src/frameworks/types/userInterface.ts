export interface UserDataSignup {
	name: string;
	email: string;
	phone: number;
	password: string;
	userType: string;
	// isPremiumUser: boolean
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