import { CandidateData } from "../frameworks/types/candidateInterface";

export class Candidate {
	name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;

	constructor({ name, email, phone, password, userType }: CandidateData) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.userType = userType;
	}
}
