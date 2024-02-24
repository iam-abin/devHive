import { RecruiterDataProfile } from "../frameworks/types/recruiter-profile-interface"

export class RecruiterProfile {
	name: string;
	email: string;
	phone: number;
	isActive: boolean;
	gender?: string;
	profile_image?: string;
	about?: string;
	// company_id?: string;
	company_name?: string;
	company_location?: string;
	recruiterId?: string;
	// membership?: string;
	// company_size?: number;
	constructor({
		name,
		email,
		phone,
		isActive,
		gender,
		profile_image,
		about,
		// company_id,
		company_name,
		company_location,
		recruiterId,
	}: RecruiterDataProfile) {
		(this.name = name),
			(this.email = email),
			(this.phone = phone),
			(this.isActive = isActive),
			(this.gender = gender),
			(this.profile_image = profile_image),
			(this.about = about),
			// (this.company_id = company_id),
			(this.company_name = company_name),
			(this.company_location = company_location),
			(this.recruiterId = recruiterId);
	}
}
