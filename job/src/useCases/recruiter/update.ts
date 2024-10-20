import { BadRequestError, ForbiddenError, NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { JobUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/jobUpdatedPublisher";
import { kafkaClient } from "../../config/kafka.connection";
import { IJob } from "../../frameworks/types/job";

export = (dependencies: IDependency) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async(jobId: string,  recruiterId: string, data: Partial<IJob>) => {
		
		const job = await jobRepository.getAJob(jobId);
		if(!job)  throw new NotFoundError();
		if(recruiterId !== job.recruiterId.id.toString()){
			throw new ForbiddenError("You cannot modify others job")
		}
		
		if(data.deadline){
			data.deadline = new Date(data.deadline)
		}

        console.log(data);
        
        if(!data.salaryMin || !data.salaryMax) throw new BadRequestError('must add all salary fields!!'); 
        if(data.salaryMin > data.salaryMax ) throw new BadRequestError('min salary must be less than max salary!!');
        if(data.salaryMin <0 || data.salaryMax<0 ) throw new BadRequestError('cannot add negative values in the salary field!!');
        if(data.availablePosition && data.availablePosition<0 ) throw new BadRequestError('cannot add negative values in the available position field!!');
        
		const updatedJob =  await jobRepository.updateJob(jobId, data);
        const jobUpdatedEvent = new JobUpdatedEventPublisher(kafkaClient);
        await jobUpdatedEvent.publish({
            jobId: updatedJob.id,
            title : updatedJob?.title,
            recruiterId : updatedJob?.recruiterId,
            companyId : updatedJob?.companyId,
            jobDescription : updatedJob?.jobDescription,
            skills : updatedJob?.skills,
            availablePosition : updatedJob?.availablePosition,
            experienceRequired : updatedJob?.experienceRequired,
            educationRequired : updatedJob?.educationRequired,
            location : updatedJob?.location,
            employmentType : updatedJob?.employmentType,
            salaryMin : updatedJob?.salaryMin,
            salaryMax : updatedJob?.salaryMax,
			deadline: updatedJob?.deadline,
            isActive : updatedJob?.isActive,
        });

		return updatedJob
	};

	return { execute };
};
