import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { filterJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter filter job controller 1: ",data);

        const newJob = await filterJobUseCase(dependencies).execute(data);
        console.log("in recruiter filter job controller 2: ",newJob);


        res.status(200).json({message: "Job filtered successfully", data: newJob })
    };

}