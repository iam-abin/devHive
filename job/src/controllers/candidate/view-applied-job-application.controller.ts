import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAJobApplicationUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {jobApplicationId} = req.params;
        
        const application = await getAJobApplicationUseCase(dependencies).execute(jobApplicationId);
        
        res.status(200).json({message: "Job applications are ", data: application })
    };

}