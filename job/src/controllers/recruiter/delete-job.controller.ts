import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
// import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";
import { JobDeletedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-deleted-publisher";
// import { produceMessage } from "../../frameworks/services/kafka/producer";

export = (dependencies: DependenciesData)=>{

    const { useCases: { deleteJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in recruiter delete job controller 1: ",id);

        const response = await deleteJobUseCase(dependencies).execute(id);
        console.log("in recruiter delete job controller 2: ",response);

        if(response?.deletedCount === 1){

            // to produce a message to kafka topic
            // isBlocked contains user data with 'isActive' value changed
            // await produceMessage(response, 'JOB_DELETED_TOPIC')

            const jobDeletedEvent = new JobDeletedEventPublisher(kafkaClient);
            await jobDeletedEvent.publish({
                jobId: id
            })

    
    
           return res.status(200).json({message: "Job deleted successfully", data: response })
        }

        return res.status(200).json({message: "Job couldn't deleted", data: response })


    };

}