import { CandidateDataProfile } from "../frameworks/types/candidate-profile-interface";

export class CandidateProfile {
	name: string;
	email: string;
	phone: number;
	// userType: string;
	// isVarified: boolean;
	// isActive: boolean;
	gender?: string;
	currentLocation?: string;
	address?: object;
	keySkills?: object;
	profile_image?: string;
	about?: string;
	resume?: string;
	experience?: object;
	// userId: string;
	constructor({
		name,
		email,
		phone,
		// userType,
		gender,
		currentLocation,
		address,
		keySkills,
		profile_image,
		about,
		resume,
		experience,
	}: CandidateDataProfile) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		// this.userType = userType;
		this.gender = gender;
		this.currentLocation = currentLocation;
		this.address = address;
		this.keySkills = keySkills;
		this.profile_image = profile_image;
		this.about = about;
		this.resume = resume;
		this.experience = experience;
	}
}
