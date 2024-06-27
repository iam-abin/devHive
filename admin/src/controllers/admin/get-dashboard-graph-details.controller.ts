import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getDashboardGraphDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const dashboardGraphDetails = await getDashboardGraphDetailsUseCase(dependencies).execute();

        res.status(200).json({message: "dashboard graph details", data: dashboardGraphDetails })
    };

}