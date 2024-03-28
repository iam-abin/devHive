import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { changeJobApplicationStatusUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {jobApplicationId} = req.params;
        const {jobApplicationStatus} = req.body
        
        const application = await changeJobApplicationStatusUseCase(dependencies).execute(jobApplicationId, jobApplicationStatus);
        
        res.status(200).json({message: `status updated to ${jobApplicationStatus}`, data: application })
    };

}