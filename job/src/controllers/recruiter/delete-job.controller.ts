import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
// import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";
import { JobDeletedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-deleted-publisher";
import { NotAuthorizedError, NotFoundError } from "@abijobportal/common";
// import { produceMessage } from "../../frameworks/services/kafka/producer";

export = (dependencies: DependenciesData)=>{

    const { useCases: { deleteJobUseCase, getJobByIdUseCase, getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id: jobId} = req.params;
        console.log("in recruiter delete job controller 1: ",jobId);
        
        const job = await getJobByIdUseCase(dependencies).execute(jobId);
        if(!job){
            console.log(`No job Fount with jobId ${jobId}`);
            
            throw new NotFoundError()
        }


        if( job.recruiterId.toString() !== req.currentUserRecruiter?.id){
            console.log("invalid recruiter for this job edit");
            
            throw new NotAuthorizedError()
        }

        const response = await deleteJobUseCase(dependencies).execute(jobId);
        console.log("in recruiter delete job controller 2: ",response);

        const jobs = await getRecruiterCreatedJobsUseCase(dependencies).execute(req.currentUserRecruiter?.id);

        if(response?.deletedCount === 1){

            // to produce a message to kafka topic
            // isBlocked contains user data with 'isActive' value changed
            // await produceMessage(response, 'JOB_DELETED_TOPIC')

            const jobDeletedEvent = new JobDeletedEventPublisher(kafkaClient);
            await jobDeletedEvent.publish({
                jobId: jobId
            })

    
    
           return res.status(200).json({message: "Job deleted successfully", data: jobs, daletedDetails: response })
        }

        return res.status(200).json({message: "Job couldn't deleted", data: response })


    };

}