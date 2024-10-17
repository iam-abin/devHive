import { CandidateDataProfile } from "../frameworks/types/candidateProfile";

export class CandidateProfile {
	name: string;
	email: string;
	phone: number;
	isActive: boolean;
	gender?: string;
	currentLocation?: string;
	address?: object;
	skills?: string[];
	profile_image?: string;
	about?: string;
	resume?: string;
	experience?: string;
	userId: string;
	constructor({
		name,
		email,
		phone,
		isActive,
		gender,
		currentLocation,
		address,
		skills,
		profile_image,
		about,
		resume,
		experience,
		userId
	}: CandidateDataProfile) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.isActive = isActive;
		this.gender = gender;
		this.currentLocation = currentLocation;
		this.address = address;
		this.skills = skills;
		this.profile_image = profile_image;
		this.about = about;
		this.resume = resume;
		this.experience = experience;
		this.userId = userId;
	}
}
