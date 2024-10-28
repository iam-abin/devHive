import { ICandidateProfile } from '../frameworks/types/candidate';

export class CandidateProfile {
    name: string;
    email: string;
    phone: number;
    isActive: boolean;
    gender?: string;
    currentLocation?: string;
    skills?: string[];
    profileImage?: string;
    about?: string;
    experience?: string;
    userId: string;
    constructor({
        name,
        email,
        phone,
        isActive,
        gender,
        currentLocation,
        skills,
        profileImage,
        about,
        experience,
        userId,
    }: ICandidateProfile) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.isActive = isActive;
        this.gender = gender;
        this.currentLocation = currentLocation;
        this.skills = skills;
        this.profileImage = profileImage;
        this.about = about;
        this.experience = experience;
        this.userId = userId;
    }
}
