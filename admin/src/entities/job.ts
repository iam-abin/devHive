import { IJob } from "../frameworks/types/job-interface";

export class Job {
	title: string;
	recruiterId: string;
	companyName?: string;
	companyLocation?: string;
	jobDescription?: string;
	skills?: string[];
	availablePosition?: number;
	experienceRequired?: number;
	educationRequired?: string;
	employmentType?: string;
	salaryMin?: number;
	salaryMax?: number;
	isActive?: boolean;
	deadline?: Date;
	jobId: string;
	constructor({
		title,
		recruiterId,
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
	}: IJob) {
		(this.title = title),
			(this.recruiterId = recruiterId),
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
