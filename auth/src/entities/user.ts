import { IUserDataSignup } from "../frameworks/types/userInterface";

export class User {
	name: string;
	email: string;
	phone: number;
	password: string;
	userType: string;
	// isPremiumUser: boolean
	otp: number;

	constructor({ name, email, phone, password, userType, otp }: IUserDataSignup) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.userType = userType;
		this.otp = otp;
	}
}
