import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { applyJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.body;
        console.log("in  appled jobs controller 1: ",id);

        const applied = await applyJobUseCase(dependencies).execute(id);
        console.log("in  appled jobs controller 2: ",applied);


        res.status(200).json({message: "Job applied successfully", data: applied })
    };

}