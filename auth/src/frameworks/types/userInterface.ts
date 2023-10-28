export interface UserDataSignup {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;
}

export interface UserDataSignin {
	email: string;
	password: string;
	userType: string;
}