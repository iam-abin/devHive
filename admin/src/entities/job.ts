import { JobInterface } from "../frameworks/types/job-interface";

export class Job {
	title: string;
	recruiter: string;
	// company: string;
	companyName?: string;
	companyLocation?: string;
	jobDescription?: string;
	skills?: string | string[];
	availablePosition?: string;
	experienceRequired?: string;
	educationRequired?: string;
	employmentType?: string;
	salaryMin?: number;
	salaryMax?: number;
	isActive?: boolean;
	deadline?: Date;
	jobId: string;
	constructor({
		title,
		recruiter,
		// company,
		companyName,
		companyLocation,
		jobDescription,
		skills,
		availablePosition,
		experienceRequired,
		educationRequired,
		employmentType,
		salaryMin,
		salaryMax,
		isActive,
		deadline,
		jobId,
	}: JobInterface) {
		(this.title = title),
			(this.recruiter = recruiter),
			(this.companyName = companyName),
			(this.companyLocation = companyLocation),
			(this.jobDescription = jobDescription),
			(this.skills = skills),
			(this.availablePosition = availablePosition),
			(this.experienceRequired = experienceRequired),
			(this.educationRequired = educationRequired),
			(this.employmentType = employmentType),
			(this.salaryMin = salaryMin),
			(this.salaryMax = salaryMax),
			(this.isActive = isActive),
			(this.deadline = deadline);
		this.jobId = jobId;
	}
}
