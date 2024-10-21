import { CandidateDataProfile } from "../frameworks/types/candidate";

export class CandidateProfile {
	name: string;
	email: string;
	phone: number;
	isActive: boolean;
	gender?: string;
	currentLocation?: string;
	address?: object;
	skills?: string[];
	profileImage?: string;
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
		profileImage,
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
		this.profileImage = profileImage;
		this.about = about;
		this.resume = resume;
		this.experience = experience;
		this.userId = userId;
	}
}
