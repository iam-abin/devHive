import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const jobs = await getAllJobsUseCase(dependencies).execute();

        res.status(200).json({message: "all jobs", data: jobs })
    };

}