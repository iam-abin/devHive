import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { recruiterDashboardGraphDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {recruiterId} = req.params;
        const dashboardGraphDetails = await recruiterDashboardGraphDetailsUseCase(dependencies).execute(recruiterId);
        
        res.status(200).json({message: "dashboard graph details", data: dashboardGraphDetails })
    };

}