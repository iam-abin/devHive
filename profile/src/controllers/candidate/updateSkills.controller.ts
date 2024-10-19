import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { updateSkillsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {skills: skills} = req.body;
        const {userId} = req.currentUser
        
        const candidate = await updateSkillsUseCase(dependencies).execute(userId, skills);
        res.status(201).json({message: "skills updated", data: candidate })
    };

}