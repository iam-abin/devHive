import { CompanyDataProfile } from "../frameworks/types/company-profile-interface";

export class CompanyProfile {
	company_name: string;
	company_location?: string;
	email?: string;
	isActive: boolean;
	logo?: string;
	website?: string;
	company_state?: string;
	company_country?: string;
	description?: string;
    // recruiters?: [string]
	constructor({
		company_name,
		company_location,
		email,
		isActive,
		logo,
		website,
		company_state,
		company_country,
		description,
	}: CompanyDataProfile) {
		this.company_name = company_name,
		this.company_location = company_location,
		this.email = email,
		this.isActive = isActive,
		this.logo = logo,
		this.website = website,
		this.company_state = company_state,
		this.company_country = company_country,
		this.description = description
	}
}
