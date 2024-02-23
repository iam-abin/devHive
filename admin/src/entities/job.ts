import { JobInterface } from "../frameworks/types/job-interface";

export class Job {
	title: string;
	recruiter: string;
	// company: string;
	company_name?: string;
	company_location?: string;
	job_descriptions?: string;
	skills_required?: string | string[];
	available_position?: string;
	experience_required?: string;
	education_required?: string;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	isActive?: boolean;
	deadline?: Date;
	jobId: string;
	constructor({
		title,
		recruiter,
		// company,
		company_name,
		company_location,
		job_descriptions,
		skills_required,
		available_position,
		experience_required,
		education_required,
		employment_type,
		salary_min,
		salary_max,
		isActive,
		deadline,
		jobId,
	}: JobInterface) {
		(this.title = title),
			(this.recruiter = recruiter),
			(this.company_name = company_name),
			(this.company_location = company_location),
			(this.job_descriptions = job_descriptions),
			(this.skills_required = skills_required),
			(this.available_position = available_position),
			(this.experience_required = experience_required),
			(this.education_required = education_required),
			(this.employment_type = employment_type),
			(this.salary_min = salary_min),
			(this.salary_max = salary_max),
			(this.isActive = isActive),
			(this.deadline = deadline);
		this.jobId = jobId;
	}
}
