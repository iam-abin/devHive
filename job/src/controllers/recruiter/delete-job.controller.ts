import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { JobDeletedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-deleted-publisher";
import { NotAuthorizedError, NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { deleteJobUseCase, getJobByIdUseCase, getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id: jobId} = req.params;
        const response = await deleteJobUseCase(dependencies).execute(jobId);
        
        const jobs = await getRecruiterCreatedJobsUseCase(dependencies).execute(req.currentUser?.userId);

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

        res.status(200).json({message: "Job couldn't deleted", data: response });
    };

}