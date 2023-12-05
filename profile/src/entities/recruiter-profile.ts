import { RecruiterDataProfile } from "../frameworks/types/recruiter-profile-interface";

export class RecruiterProfile {
	name: string;
	email: string;
	phone: number;
	isVarified: boolean;
	isActive: boolean;
	gender?: string;
	company_name?: string;
	company_location?: string;
	company_state?: string;
	company_country?: string;
	profile_image?: string;
	about?: string;
	recruiterId?: string;
	// membership?: string;
	// company_size?: number;
	constructor({
		name,
		email,
		phone,
		userType,
		isVarified,
		isActive,
		gender,
		company_name,
		company_location,
		company_state,
		company_country,
		profile_image,
		about,
		recruiterId,
	}: RecruiterDataProfile) {
		(this.name = name),
			(this.email = email),
			(this.phone = phone),
			(this.isVarified = isVarified),
			(this.isActive = isActive),
			(this.gender = gender),
			(this.company_name = company_name),
			(this.company_location = company_location),
			(this.company_state = company_state),
			(this.company_country = company_country),
			(this.profile_image = profile_image),
			(this.about = about),
			(this.recruiterId = recruiterId);
	}
}
