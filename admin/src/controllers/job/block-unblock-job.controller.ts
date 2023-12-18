import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";

export = (dependencies: DependenciesData)=>{

    const { useCases: { blockUnblockJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {jobId} = req.params;
        

        const isBlocked = await blockUnblockJobUseCase(dependencies).execute(jobId);

        console.log("in bocke unblock controller before message send to kafka", isBlocked);
        
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const jobUpdatedEvent = new JobUpdatedEventPublisher(kafkaClient)
		await jobUpdatedEvent.publish(isBlocked)
        

        res.status(200).json({message: `job ${isBlocked.isActive ? "unBlocked" : "Blocked"}  successfully`, data: isBlocked})
    };

}