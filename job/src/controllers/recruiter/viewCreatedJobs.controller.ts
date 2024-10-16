import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
// import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const { userId } = req.currentUser;
        const jobs = await getRecruiterCreatedJobsUseCase(dependencies).execute(userId);
        
        res.status(201).json({message: "Jobs got successfully", jobs: jobs })
    };

}