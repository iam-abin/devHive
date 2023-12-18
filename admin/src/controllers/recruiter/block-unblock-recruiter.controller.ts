import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { UserUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/user-updated-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { blockUnblockRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        

        const isBlocked = await blockUnblockRecruiterUseCase(dependencies).execute(userId);

        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const userUpdatedEvent = new UserUpdatedEventPublisher(kafkaClient)
		await userUpdatedEvent.publish(isBlocked)

        res.status(200).json({message: `recruiter ${isBlocked.isActive ? "unBlocked" : "blocked"}  successfully`, data: isBlocked})
    };

}