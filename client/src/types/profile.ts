import { IUserProfile } from "./user";


export interface ICandidateProfile extends IUserProfile {
    gender: string;
    currentLocation: string;
    skills: string[];
    profileImage: string;
    about: string;
    resume: {
        filename: string;
        url: string;
    };
    experience: string;
    preferredJobs: string[];
    isPremiumUser: boolean;
    isActive: boolean;
}

export interface IRecruiterProfile extends IUserProfile {
	gender: string;
	profileImage: string;
	about: string;

	companyName: string;
	companyWebsite: string;
	companyLocation: string;
	companyState: string;
	companyCountry: string;
}


export interface IResume {
    filename: string;
    url: string;
}

export interface IFileData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

export interface IUploadResponse {
    public_id: string;
    url: string;
}

export interface IPaymentData {
    candidateId: string;
}

export interface IAddress {
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}
