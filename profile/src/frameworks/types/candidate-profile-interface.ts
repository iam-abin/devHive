export interface CandidateDataProfile{
    name: string;
	email: string;
	phone: number;
	userType: string;
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
}