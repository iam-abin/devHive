import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByUserIdUseCase}} = dependencies

    return async (req: Request, res: Response)=>{
        const { userId } = req.params;
        
        const candidate = await getCandidateProfileByUserIdUseCase(dependencies).execute(userId, req.file);
        
        res.status(200).json({message: "candidate data", data: candidate })
    };

}