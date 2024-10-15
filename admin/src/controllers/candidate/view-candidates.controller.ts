import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllCandidatesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const candidates = await getAllCandidatesUseCase(dependencies).execute();

        res.status(200).json({message: "all candidates", data: candidates })
    };

}