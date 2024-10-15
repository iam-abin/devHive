import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { changeJobApplicationStatusUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser;
        const {jobApplicationId} = req.params;
        const {jobApplicationStatus} = req.body
        
        const application = await changeJobApplicationStatusUseCase(dependencies).execute(jobApplicationId, jobApplicationStatus, userId);
        
        res.status(200).json({message: `status updated to ${jobApplicationStatus}`, data: application })
    };

}