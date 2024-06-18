import { IJob } from "../frameworks/types/job-interface";

export class Job {
	title: string;
	recruiterId: string;
	// companyId?: string;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	// location?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	isActive?: boolean;
	deadline?: Date;
	number_applied?: number;
	number_hired?: number;
	number_rejected?: number;
	company_name?: string;
	company_location?: string;
	constructor({
		title,
		recruiterId,
		// companyId,
		job_descriptions,
		skills_required,
		available_position,
		experience_required,
		education_required,
		// location,
		employment_type,
		salary_min,
		salary_max,
		has_applied,
		isActive,
		deadline,
		number_applied,
		number_hired,
		number_rejected,
		company_name,
		company_location,
	}: IJob) {
		(this.title = title),
			(this.recruiterId = recruiterId),
			// this.companyId = companyId ,
			(this.job_descriptions = job_descriptions),
			(this.skills_required = skills_required),
			(this.available_position = available_position),
			(this.experience_required = experience_required),
			(this.education_required = education_required),
			// this.location = location ,
			(this.employment_type = employment_type),
			(this.salary_min = salary_min),
			(this.salary_max = salary_max),
			(this.has_applied = has_applied),
			(this.isActive = isActive),
			(this.deadline = deadline),
			(this.number_applied = number_applied),
			(this.number_hired = number_hired),
			(this.number_rejected = number_rejected),
			(this.company_name = company_name),
			(this.company_location = company_location);
	}
}
