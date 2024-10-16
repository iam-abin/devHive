import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { updateSkillsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id, skills: skills} = req.body;
        
        const candidate = await updateSkillsUseCase(dependencies).execute(id, skills);
        res.status(201).json({message: "skills updated", data: candidate })
    };

}