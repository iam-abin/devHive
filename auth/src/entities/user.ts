import { IUserAttributes } from "../frameworks/database/mongo/models/users";
import { ISignup } from "../frameworks/types/userInterface";

export class User {
	name: string;
	email: string;
	phone: number;
	password: string;
	role: string;
	// isPremiumUser: boolean
	otp: number;

	constructor({ name, email, phone, password, role, otp }: IUserAttributes) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.role = role;
		this.otp = otp;
	}
}
