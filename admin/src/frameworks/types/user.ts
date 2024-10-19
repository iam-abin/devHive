export interface IUser{
    userId: string;
	name: string;
	email: string;
	phone: number;
	role: string;
	isActive: boolean;
}

export interface IRecruiter extends IUser{
	gender?: string;
	companyName?: string;
	companyLocation?: string;
	companyState?: string;
	companyCountry?: string;
	profileImage?: string;
	about?: string;
}

export interface ICandidate extends IUser{
	gender?: string;
	currentLocation?: string;
	address?: object;
	skills?: string[];
	profileImage?: string;
	about?: string;
	resume?: string;
	experience?: string;
	companyLocation?: string;
	bio?: string;
}
