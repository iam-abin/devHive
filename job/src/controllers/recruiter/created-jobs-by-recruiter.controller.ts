import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
// import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{

        console.log(req);
        
        // const recruiterId = req.currentUserRecruiter?.id
        const { recruiterId } = req.params;
        console.log("in recruiter created jobs controller 1: ",recruiterId);

        const jobs = await getRecruiterCreatedJobsUseCase(dependencies).execute(recruiterId);
        console.log("in recruiter created jobs controller 2: ",jobs);

        res.status(201).json({message: "Jobs got successfully", jobs: jobs })
    };

}