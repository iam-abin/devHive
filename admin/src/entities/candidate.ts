export interface ICandidateData{
    name: string;
	email: string;
	phone: string;
	password: string;
	role: string;
	userId: string

	gender?: string;
	currentLocation?: string;
	address?: object;
	skills?: string[];
	profile_image?: string;
	about?: string;
	resume?: string;
	experience?: string;
}

export class Candidate {
	name: string;
	email: string;
	phone: string;
	password: string;
	role: string;
	userId: string;

	gender?: string;
	currentLocation?: string;
	address?: object;
	skills?: string[];
	profile_image?: string;
	about?: string;
	resume?: string;
	experience?: string;

	constructor({ name, email, phone, password, role, userId }: ICandidateData) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.role = role;
		this.userId = userId;
	}
}
