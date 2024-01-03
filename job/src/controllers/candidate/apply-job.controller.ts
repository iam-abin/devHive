import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { applyJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const jobApplicationPayload = req.body;
        console.log("in  apply job controller 1: ",jobApplicationPayload);

        const applied = await applyJobUseCase(dependencies).execute(jobApplicationPayload);
        console.log("in  apply job controller 2: ",applied);


        res.status(200).json({message: "Job applied successfully", data: applied })
    };

}