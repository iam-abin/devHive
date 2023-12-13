import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
// import { BadRequestError } from "@abijobportal/common";
import { JobCreatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter create job controller 1: ",data);

        const newJob = await createJobUseCase(dependencies).execute(data);
        console.log("in recruiter create job controller 2: ",newJob);

        // // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed

        const jobCreatedEvent = new JobCreatedEventPublisher(kafkaClient);
        await jobCreatedEvent.publish({
            title : newJob?.title,
            recruiter : newJob?.recruiter,
            company : newJob?.company,
            job_descriptions : newJob?.job_descriptions,
            skills_required : newJob?.skills_required,
            available_position : newJob?.available_position,
            experience_required : newJob?.experience_required,
            education_required : newJob?.education_required,
            location : newJob?.location,
            employment_type : newJob?.employment_type,
            salary_min : newJob?.salary_min,
            salary_max : newJob?.salary_max,
            blocked : newJob?.blocked,
            jobId: newJob.id
        });


        res.status(201).json({message: "Job created successfully", data: newJob })
    };

}