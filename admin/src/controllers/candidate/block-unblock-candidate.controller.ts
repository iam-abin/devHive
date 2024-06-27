import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { blockUnblockCandidateUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        
        const isBlocked = await blockUnblockCandidateUseCase(dependencies).execute(userId);

        if(!isBlocked){
            throw new Error("Candidate Not Found")
        }
        
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const userUpdatedEvent = new UserUpdatedEventPublisher(kafkaClient)
		await userUpdatedEvent.publish(isBlocked)
        

        res.status(200).json({message: `candidate ${isBlocked.isActive ? "unBlocked" : "Blocked"}  successfully`, data: isBlocked})
    };

}