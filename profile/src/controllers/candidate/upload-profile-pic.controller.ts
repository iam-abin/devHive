import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { uploadCandidateProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const user = req.currentUser; 
        const candidate = await uploadCandidateProfilePicUseCase(dependencies).execute(user?.userId ,req.file);
        
        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}