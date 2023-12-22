import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { blockUnblockCandidateUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        
        console.log("in block unblock controller userId ",userId);
        
        const isBlocked = await blockUnblockCandidateUseCase(dependencies).execute(userId);

        if(!isBlocked){
            throw new Error("Candidate Not Found")
        }

        console.log("in bocke unblock controller before message send to kafka", isBlocked);
        
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const userUpdatedEvent = new UserUpdatedEventPublisher(kafkaClient)
		await userUpdatedEvent.publish(isBlocked)
        

        res.status(200).json({message: `candidate ${isBlocked.isActive ? "unBlocked" : "Blocked"}  successfully`, data: isBlocked})
    };

}