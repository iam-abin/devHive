import { CandidateData } from "../frameworks/types/candidateInterface";

export class Candidate {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;
	userId: string;

	gender?: string;
	currentLocation?: string;
	address?: object;
	keySkills?: string[];
	profile_image?: string;
	about?: string;
	resume?: string;
	experience?: string;

	constructor({ name, email, phone, password, userType, userId }: CandidateData) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.userType = userType;
		this.userId = userId;
	}
}
