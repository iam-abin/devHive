import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { filterJobRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter filter job controller 1: ",data);

        const newJob = await filterJobRecruiterUseCase(dependencies).execute(data);
        console.log("in recruiter filter job controller 2: ",newJob);


        res.status(200).json({message: "Job filtered successfully", data: newJob })
    };

}