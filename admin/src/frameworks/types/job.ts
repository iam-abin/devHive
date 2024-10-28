export interface IJob {
    jobId: string;
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
    isActive?: boolean;
    deadline?: Date;
}
