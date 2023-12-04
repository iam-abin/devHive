export interface JobInterface {
	title: string;
	recruiter: string;
	company: string;
	job_descriptions?: boolean;
	skills_required?: string;
	available_position?: string;
	experience_required?: boolean;
	education_required?: object;
	location?: object;
	employment_type?: string;
	salary_min?: number;
	salary_max?: number;
	has_applied?: boolean;
	blocked?: boolean;
	deadline?: Date;
	number_applied?: number;
	number_rejected?: number;
}
