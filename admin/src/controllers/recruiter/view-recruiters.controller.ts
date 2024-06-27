import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllRecruitersUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const recruiter = await getAllRecruitersUseCase(dependencies).execute();

        res.status(200).json({message: "all recruiters", data: recruiter })
    };

}