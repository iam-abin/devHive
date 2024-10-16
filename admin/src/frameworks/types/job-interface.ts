export interface IJob {
	jobId: string
    title: string;
    recruiter: string;
    companyName: string;
    companyLocation: string;
    jobDescription?: string;
    skills?: string[];
    availablePosition?: string;
    experienceRequired?: string;
    educationRequired?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    isActive?: boolean;
    deadline?: Date;
}

