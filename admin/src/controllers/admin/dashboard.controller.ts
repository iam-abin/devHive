import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllDashboardCardsDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const dashboardCardsDetails = await getAllDashboardCardsDetailsUseCase(dependencies).execute();
        
        res.status(200).json({message: "dashboard card details", data: dashboardCardsDetails })
    };

}