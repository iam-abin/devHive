import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter create job controller 1: ",data);

        const newJob = await createJobUseCase(dependencies).execute(data);
        console.log("in recruiter create job controller 2: ",newJob);


        res.status(201).json({message: "Job created successfully", data: newJob })
    };

}