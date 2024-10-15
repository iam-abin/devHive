import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { JobUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-updated-publisher";

export = (dependencies: IDependency)=>{

    const { useCases: { blockUnblockJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {jobId} = req.params;
        
        const isBlocked = await blockUnblockJobUseCase(dependencies).execute(jobId);
        
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const jobUpdatedEvent = new JobUpdatedEventPublisher(kafkaClient)
		await jobUpdatedEvent.publish(isBlocked)
        

        res.status(200).json({message: `job ${isBlocked.isActive ? "unBlocked" : "Blocked"}  successfully`, data: isBlocked})
    };

}