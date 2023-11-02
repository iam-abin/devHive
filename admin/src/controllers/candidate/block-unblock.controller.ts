import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { blockUnblockCandidateUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const isBlocked = await blockUnblockCandidateUseCase(dependencies).execute({
            id
        });

        res.status(200).json({message: `candidate ${isBlocked ? "blocked" : "unBlocked"}  successfully`, data: {blocked: isBlocked}})
    };

}