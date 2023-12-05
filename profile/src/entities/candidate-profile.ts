import { CandidateDataProfile } from "../frameworks/types/candidate-profile-interface";

export class CandidateProfile {
	name: string;
	email: string;
	phone: number;
	isVarified: boolean;
	isActive: boolean;
	gender?: string;
	currentLocation?: string;
	address?: object;
	keySkills?: object;
	profile_image?: string;
	about?: string;
	resume?: string;
	// experience?: object;
	experience?: string;
	candidateId: string;
	constructor({
		name,
		email,
		phone,
		isVarified,
		isActive,
		gender,
		currentLocation,
		address,
		keySkills,
		profile_image,
		about,
		resume,
		experience,
		candidateId
	}: CandidateDataProfile) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.isVarified = isVarified;
		this.isActive = isActive;
		this.gender = gender;
		this.currentLocation = currentLocation;
		this.address = address;
		this.keySkills = keySkills;
		this.profile_image = profile_image;
		this.about = about;
		this.resume = resume;
		this.experience = experience;
		this.candidateId = candidateId;
	}
}
