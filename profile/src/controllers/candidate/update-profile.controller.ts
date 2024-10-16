import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka.connection";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
import { ForbiddenError, NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { updateCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        const { userId } = req.currentUser;
        
        const candidate = await updateCandidateProfileUseCase(dependencies).execute(userId, updatedData);
       

        res.status(200).json({message: "candidate updated successfully", data: candidate })
    };

}