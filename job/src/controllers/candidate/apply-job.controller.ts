import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { applyJobUseCase, getAnAppliedJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const jobApplicationPayload = req.body;
        console.log("in  apply job controller 1: ",jobApplicationPayload);

        const isApplicationExist = await getAnAppliedJobUseCase(dependencies).execute(jobApplicationPayload.candidateId,jobApplicationPayload.jobId);

        if(isApplicationExist){
            throw new BadRequestError("you have already applied for this job");
        }

        const applied = await applyJobUseCase(dependencies).execute(jobApplicationPayload);
        console.log("in  apply job controller 2: ",applied);


        res.status(200).json({message: "Job applied successfully", data: applied })
    };

}