import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
// import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const { recruiterId } = req.params;
        const jobs = await getRecruiterCreatedJobsUseCase(dependencies).execute(recruiterId);
        
        res.status(201).json({message: "Jobs got successfully", jobs: jobs })
    };

}