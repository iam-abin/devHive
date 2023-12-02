export interface RecruiterDataProfile{
    name: string;
	email: string;
	phone: number;
	userType: string;
	// isVarified: boolean;
	// isActive: boolean;
	gender?: string;
	currentLocation?: string;
	profile_image?: string;
	about?: string;
	membership?: string;
	userId: string;
	company_name?: string;
	company_size?: number;
}