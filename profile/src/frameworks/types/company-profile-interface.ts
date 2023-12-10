export interface CompanyDataProfile {
	company_name: string;
	company_location?: string;
	company_state?: string;
	company_country?: string;
	email?: string;
	isActive: boolean;
	logo?: string;
	website?: string;
	description?: string;
    recruiters?: string[]
}
