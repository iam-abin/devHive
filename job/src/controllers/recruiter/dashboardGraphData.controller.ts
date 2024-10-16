import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { recruiterDashboardGraphDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser;
        const dashboardGraphDetails = await recruiterDashboardGraphDetailsUseCase(dependencies).execute(userId);
        
        res.status(200).json({message: "dashboard graph data fetched successfully", data: dashboardGraphDetails })
    };

}