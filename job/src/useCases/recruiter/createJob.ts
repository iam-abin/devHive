import { BadRequestError } from "@abijobportal/common";
import { Job } from "../../entities/job";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IJob } from "../../frameworks/types/job";
import { JobCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-created-publisher";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository)
        throw new Error("jobRepository should exist in dependencies");

    const execute = async ( recruiterId: string, jobData: IJob,) => {
        // Checks before creating a job
        if (!jobData.companyName || !jobData.companyLocation)
            throw new BadRequestError(
                "Add company details in the profile before creating a job!!"
            );
        if (!jobData.salaryMin || !jobData.salaryMax)
            throw new BadRequestError("must add all salary fields!!");
        if (jobData.salaryMin > jobData.salaryMax)
            throw new BadRequestError(
                "min salary must be less than max salary!!"
            );
        if (jobData.salaryMin < 0 || jobData.salaryMax < 0)
            throw new BadRequestError(
                "cannot add negative values in the salary field!!"
            );
        if (jobData.availablePosition && jobData.availablePosition < 1)
            throw new BadRequestError(
                "Available number of position must be grater than 0!!"
            );
        if (jobData.deadline) {
            jobData.deadline = new Date(jobData.deadline);
        }
        
        const job = new Job({ ...jobData, recruiterId });

        const newJob = await jobRepository.createJob(job);

        // // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
        const jobCreatedEvent = new JobCreatedEventPublisher(kafkaClient);
        await jobCreatedEvent.publish({
            jobId: newJob.id,
            title: newJob?.title,
            recruiterId: newJob?.recruiterId,
            companyName: newJob?.companyName,
            companyLocation: newJob?.companyLocation,
            jobDescription: newJob?.jobDescription,
            skills: newJob?.skills,
            availablePosition: newJob?.availablePosition,
            experienceRequired: newJob?.experienceRequired,
            educationRequired: newJob?.educationRequired,
            employmentType: newJob?.employmentType,
            salaryMin: newJob?.salaryMin,
            salaryMax: newJob?.salaryMax,
			deadline: newJob?.deadline,
            isActive: newJob?.isActive,
        });

        return;
    };

    return { execute };
};
