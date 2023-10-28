import { UserDataSignup } from "../frameworks/types/userInterface";

export class User {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;

	constructor({ name, email, phone, password, userType }: UserDataSignup) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.userType = userType;
	}
}
