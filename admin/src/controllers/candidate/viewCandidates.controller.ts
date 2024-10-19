import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllCandidatesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const candidates = await getAllCandidatesUseCase(dependencies).execute();

        res.status(200).json({message: "candidates fetched successfully", data: candidates })
    };

}