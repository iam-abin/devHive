import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { JobUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-updated-publisher";
import { kafkaClient } from "../../config/kafka-connection";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { updateJobUseCase, getJobByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        const {jobId} = data;
        
        if(!data.company_name || !data.company_location ) throw new BadRequestError('Add company details in the profile before creating a job!!');
        if(!data.salary_min || !data.salary_max) throw new BadRequestError('must add all salary fields!!'); 
        if(data.salary_min > data.salary_max ) throw new BadRequestError('min salary must be less than max salary!!');
        if(data.salary_min <0 || data.salary_max<0 ) throw new BadRequestError('cannot add negative values in the salary field!!');
        if(data.available_position && data.available_position<0 ) throw new BadRequestError('cannot add negative values in the available position field!!');
        
        const job = await getJobByIdUseCase(dependencies).execute(jobId);
        if(!job)  throw new NotFoundError();

        if( job.recruiterId._id.toString() !== req.currentUser?.userId) throw new NotAuthorizedError();

        const updatedJob = await updateJobUseCase(dependencies).execute(jobId, data);
        //  // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
		// await produceMessage(updatedJob, 'JOB_UPDATED_TOPIC')
        const jobUpdatedEvent = new JobUpdatedEventPublisher(kafkaClient);
        await jobUpdatedEvent.publish({
            jobId: updatedJob.id,
            title : updatedJob?.title,
            recruiterId : updatedJob?.recruiterId,
            companyId : updatedJob?.companyId,
            job_descriptions : updatedJob?.job_descriptions,
            skills_required : updatedJob?.skills_required,
            available_position : updatedJob?.available_position,
            experience_required : updatedJob?.experience_required,
            education_required : updatedJob?.education_required,
            location : updatedJob?.location,
            employment_type : updatedJob?.employment_type,
            salary_min : updatedJob?.salary_min,
            salary_max : updatedJob?.salary_max,
            isActive : updatedJob?.isActive,
        });


        res.status(200).json({message: "Job updated successfully", data: updatedJob })
    };

}