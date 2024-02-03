
export interface JobFormData {
	title: string;
	recruiterId: string;
	companyId?: string;
	job_descriptions: string;
	skills_required: string[];
	available_position: number;
	experience_required: string;
	education_required: string;
	location: string;
	employment_type: string;
	salary_min: number;
	salary_max: number;
	deadline: string;
}
