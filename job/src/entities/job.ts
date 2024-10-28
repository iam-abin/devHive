import { IJob } from '../frameworks/types/job';

export class Job {
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
        deadline,
    }: IJob) {
        this.title = title;
        this.recruiterId = recruiterId;
        this.jobDescription = jobDescription;
        this.skills = skills;
        this.availablePosition = availablePosition;
        this.experienceRequired = experienceRequired;
        this.educationRequired = educationRequired;
        this.employmentType = employmentType;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.deadline = deadline;
        this.companyName = companyName;
        this.companyLocation = companyLocation;
    }
}
