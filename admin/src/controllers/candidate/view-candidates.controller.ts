import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllCandidatesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const candidates = await getAllCandidatesUseCase(dependencies).execute();

        res.status(200).json({message: "all candidates", data: candidates })
    };

}