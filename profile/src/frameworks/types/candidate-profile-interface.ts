export interface ICandidateProfile{
	userId: string;
	email: string;
	name: string;
	role: string;
	phone: number;
	isActive: boolean;
}

export interface IResume{
	url: string,
	fileName: string
}

export interface CandidateDataProfile extends ICandidateProfile{
	isVarified: boolean;
	gender: string;
	currentLocation: string;
	address: object;
	skills: string[];
	profile_image: string;
	about: string;
	resume: string;
	experience: string;
}

export interface IPaymentData{
	candidateId: string
}