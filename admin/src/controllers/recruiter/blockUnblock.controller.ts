import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { blockUnblockRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        

        const isBlocked = await blockUnblockRecruiterUseCase(dependencies).execute(userId);

      

        res.status(200).json({message: `recruiter ${isBlocked.isActive ? "unBlocked" : "blocked"}  successfully`, data: isBlocked})
    };

}