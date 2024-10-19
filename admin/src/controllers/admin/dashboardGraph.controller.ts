import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getDashboardGraphDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const dashboardGraphDetails = await getDashboardGraphDetailsUseCase(dependencies).execute();

        res.status(200).json({message: "dashboard graph details", data: dashboardGraphDetails })
    };

}