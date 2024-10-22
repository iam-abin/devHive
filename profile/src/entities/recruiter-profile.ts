import { IRecruiterProfile } from "../frameworks/types/recruiter";

export class RecruiterProfile {
	name: string;
	email: string;
	phone: number;
	isActive: boolean;
	gender?: string;
	profileImage?: string;
	about?: string;
	userId?: string;
	constructor({
		name,
		email,
		phone,
		isActive,
		gender,
		profileImage,
		about,
		userId,
	}: IRecruiterProfile) {
		(this.name = name),
			(this.email = email),
			(this.phone = phone),
			(this.isActive = isActive),
			(this.gender = gender),
			(this.profileImage = profileImage),
			(this.about = about),
			(this.userId = userId);
	}
}
