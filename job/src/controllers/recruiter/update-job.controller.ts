import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updateJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        const {id} = req.body
        console.log("in recruiter update job controller 1: ",data, "id: ",id);

        const updatedJob = await updateJobUseCase(dependencies).execute(id, data);
        console.log("in recruiter update job controller 2: ",data, "id: ",id);


        res.status(200).json({message: "Job updated successfully", data: updatedJob })
    };

}