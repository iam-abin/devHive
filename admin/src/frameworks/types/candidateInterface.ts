export interface CandidateData{
    name: string;
	email: string;
	phone: string;
	password: string;
	userType: string;
	userId: string

	gender?: string;
	currentLocation?: string;
	address?: object;
	keySkills?: string[];
	profile_image?: string;
	about?: string;
	resume?: string;
	experience?: string;
}

export interface blockUnBlockInterface{
    id: string
}