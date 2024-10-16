import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { uploadResumeUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser;
        
        const candidate = await uploadResumeUseCase(dependencies).execute(userId , req.body);
        
        res.status(201).json({message: "resume uploaded", data: candidate })
    };

}