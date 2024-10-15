import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { BadRequestError, RequestValidationError } from "@abijobportal/common";
import { JobCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: IDependency)=>{

    const { useCases: { createJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        
        if(!data.company_name || !data.company_location ) throw new BadRequestError('Add company details in the profile before creating a job!!');
        if(!data.salary_min || !data.salary_max) throw new BadRequestError('must add all salary fields!!'); 
        if(data.salary_min > data.salary_max ) throw new BadRequestError('min salary must be less than max salary!!');
        if(data.salary_min <0 || data.salary_max<0 ) throw new BadRequestError('cannot add negative values in the salary field!!');
        if(data.available_position && data.available_position<1 ) throw new BadRequestError('Available number of position must be grater than 0!!');

        const newJob = await createJobUseCase(dependencies).execute(data);

        // // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
        const jobCreatedEvent = new JobCreatedEventPublisher(kafkaClient);
        await jobCreatedEvent.publish({
            jobId: newJob.id,
            title : newJob?.title,
            recruiterId : newJob?.recruiterId,
            // companyId : newJob?.companyId,
            company_name: newJob?.company_name,
	        // company_location: newJob?.company_location,
	        company_location: newJob?.company_location,
            job_descriptions : newJob?.job_descriptions,
            skills_required : newJob?.skills_required,
            available_position : newJob?.available_position,
            experience_required : newJob?.experience_required,
            education_required : newJob?.education_required,
            // location : newJob?.location,
            employment_type : newJob?.employment_type,
            salary_min : newJob?.salary_min,
            salary_max : newJob?.salary_max,
            isActive : newJob?.isActive,
        });


        res.status(201).json({message: "Job created successfully", data: newJob })
    };

}