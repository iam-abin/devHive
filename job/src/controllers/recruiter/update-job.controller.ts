import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updateJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        const {id} = req.params;
        console.log("in recruiter update job controller 1: ",data, "id: ",id);

        const updatedJob = await updateJobUseCase(dependencies).execute(id, data);
        console.log("in recruiter update job controller 2: ",updatedJob, "id: ",id);

        //  // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
		// await produceMessage(updatedJob, 'JOB_UPDATED_TOPIC')
        const jobUpdatedEvent = new JobUpdatedEventPublisher(kafkaClient);
        await jobUpdatedEvent.publish({
            jobId: updatedJob.id,
            title : updatedJob?.title,
            recruiter : updatedJob?.recruiter,
            company : updatedJob?.company,
            job_descriptions : updatedJob?.job_descriptions,
            skills_required : updatedJob?.skills_required,
            available_position : updatedJob?.available_position,
            experience_required : updatedJob?.experience_required,
            education_required : updatedJob?.education_required,
            location : updatedJob?.location,
            employment_type : updatedJob?.employment_type,
            salary_min : updatedJob?.salary_min,
            salary_max : updatedJob?.salary_max,
            blocked : updatedJob?.blocked,
        });


        res.status(200).json({message: "Job updated successfully", data: updatedJob })
    };

}