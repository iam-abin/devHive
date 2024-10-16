
export interface JobFormData {
	title: string;
	recruiterId: string;
	companyId?: string;
	jobDescription: string;
	skills: string[];
	availablePosition: number;
	experienceRequired: string;
	educationRequired: string;
	employmentType: string;
	salaryMin: number;
	salaryMax: number;
	deadline: string;
	companyName: string;
	companyLocation: string;
}
