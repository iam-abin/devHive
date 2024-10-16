export interface RecruiterDataProfile{
    name: string;
	email: string;
	phone: number;
	isVarified: boolean;
	isActive: boolean;
	gender?: string;

	companyName?: string;
	companyLocation?: string;
	company_state?: string;
	company_country?: string;

	profile_image?: string;
	about?: string;
	
	company_id?: string;
	recruiterId?: string;
}