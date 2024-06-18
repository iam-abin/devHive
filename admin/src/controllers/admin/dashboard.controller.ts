import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllDashboardCardsDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const dashboardCardsDetails = await getAllDashboardCardsDetailsUseCase(dependencies).execute();
        
        res.status(200).json({message: "dashboard card details", data: dashboardCardsDetails })
    };

}