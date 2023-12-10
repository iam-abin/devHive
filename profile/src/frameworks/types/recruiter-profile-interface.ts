export interface RecruiterDataProfile{
    name: string;
	email: string;
	phone: number;
	isVarified: boolean;
	isActive: boolean;
	gender?: string;

	company_name?: string;
	company_location?: string;
	company_state?: string;
	company_country?: string;

	profile_image?: string;
	about?: string;
	
	company_id?: string;
	recruiterId?: string;
}