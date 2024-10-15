import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllRecruitersUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const recruiter = await getAllRecruitersUseCase(dependencies).execute();

        res.status(200).json({message: "all recruiters", data: recruiter })
    };

}