export interface UserData {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;
}

export class User {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;

	constructor({ name, email, phone, password, userType }: UserData) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.userType = userType;
	}
}
