export interface IJob {
	title: string;
	recruiterId: string;
	companyName: string;
	companyLocation: string;

	jobDescription?: string;
	skills?: string[];
	availablePosition?: number;
	experienceRequired?: number;
	educationRequired?: string;
	employmentType?: string;
	salaryMin?: number;
	salaryMax?: number;
	deadline?: Date;
}
