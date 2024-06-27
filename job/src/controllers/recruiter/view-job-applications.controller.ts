import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllJobApplicationsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {recruiterId} = req.params;
        
        const applications = await getAllJobApplicationsUseCase(dependencies).execute(recruiterId, null);
        
        res.status(200).json({message: "Job applications are ", data: applications })
    };

}