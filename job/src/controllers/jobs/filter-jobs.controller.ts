import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { filterJobCandidateUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in candidate filter job controller 1: ",data);

        const newJob = await filterJobCandidateUseCase(dependencies).execute(data);
        console.log("in candidate filter job controller 2: ",newJob);


        res.status(200).json({message: "Job filtered successfully", data: newJob })
    };

}