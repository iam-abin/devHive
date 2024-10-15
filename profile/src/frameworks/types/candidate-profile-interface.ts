export interface CandidateDataProfile{
    name: string;
	email: string;
	phone: number;
	role: string;
	isVarified: boolean;
	isActive: boolean;
	gender?: string;
	currentLocation?: string;
	address?: object;
	keySkills?: string[];
	profile_image?: string;
	about?: string;
	resume?: string;
	// experience?: object;
	experience?: string;
	userId: string;
}