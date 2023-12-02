import { RecruiterDataProfile } from "../frameworks/types/recruiter-profile-interface";

export class RecruiterProfile {
	name: string;
	email: string;
	phone: number;
	userType: string;
	// isVarified: boolean;
	// isActive: boolean;
	gender?: string;
	currentLocation?: string;
	profile_image?: string;
	about?: string;
	membership?: string;
	company_name?: string;
	company_size?: number;
	// userId: string;
	constructor({
		name,
		email,
		phone,
		userType,
		gender,
		currentLocation,
		profile_image,
		about,
		membership,
		company_name,
		company_size,
	}: RecruiterDataProfile) {
		this.name = name,
		this.email = email,
		this.phone = phone,
		this.userType = userType,
		this.gender = gender,
		this.currentLocation = currentLocation,
		this.profile_image = profile_image,
		this.about = about,
		this.membership = membership,
		this.company_name = company_name,
		this.company_size = company_size
	}
}
