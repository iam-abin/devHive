import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { changeJobApplicationStatusUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {jobApplicationId} = req.params;
        const {jobApplicationStatus} = req.body
        console.log("req.body",req.body);
        
        console.log("in  change-job-application-status.controllercontroller  1 jobApplicationId: ",jobApplicationId);
        console.log("in  change-job-application-status.controllercontroller 1 jobApplicationStatus: ",jobApplicationStatus);
        

        const application = await changeJobApplicationStatusUseCase(dependencies).execute(jobApplicationId, jobApplicationStatus);
        console.log("in change-job-application-status.controller 2: ",application);


        res.status(200).json({message: `status updated to ${jobApplicationStatus}`, data: application })
    };

}