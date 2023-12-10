import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllJobApplicationsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in  apply job controller 1: ",id);

        const applications = await getAllJobApplicationsUseCase(dependencies).execute(id);
        console.log("in  apply job controller 2: ",applications);


        res.status(200).json({message: "Job applications are ", data: applications })
    };

}