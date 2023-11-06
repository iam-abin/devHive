import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { produceMessage } from "../../frameworks/services/kafka/producer";

export = (dependencies: DependenciesData)=>{

    const { useCases: { blockUnblockCandidateUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const isBlocked = await blockUnblockCandidateUseCase(dependencies).execute({
            id
        });

        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
		await produceMessage(isBlocked, 'USER_UPDATED_TOPIC')

        res.status(200).json({message: `candidate ${isBlocked ? "blocked" : "unBlocked"}  successfully`, data: {blocked: isBlocked}})
    };

}