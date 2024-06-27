import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
// import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const { recruiterId } = req.params;
        const jobs = await getRecruiterCreatedJobsUseCase(dependencies).execute(recruiterId);
        
        res.status(201).json({message: "Jobs got successfully", jobs: jobs })
    };

}