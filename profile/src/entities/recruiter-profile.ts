import { RecruiterDataProfile } from "../frameworks/types/recruiter";

export class RecruiterProfile {
	name: string;
	email: string;
	phone: number;
	isActive: boolean;
	gender?: string;
	profileImage?: string;
	about?: string;
	company_id?: string;
	userId?: string;
	// membership?: string;
	// company_size?: number;
	constructor({
		name,
		email,
		phone,
		isActive,
		gender,
		profileImage,
		about,
		company_id,
		userId,
	}: RecruiterDataProfile) {
		(this.name = name),
			(this.email = email),
			(this.phone = phone),
			(this.isActive = isActive),
			(this.gender = gender),
			(this.profileImage = profileImage),
			(this.about = about),
			(this.company_id = company_id),
			(this.userId = userId);
	}
}
