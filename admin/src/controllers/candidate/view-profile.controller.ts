import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getCandidateProfileByuserIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        
        const candidate = await getCandidateProfileByuserIdUseCase(dependencies).execute(userId);

        res.status(200).json({message: "candidate data", data: candidate })
    };

}