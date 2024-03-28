import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { recruiterDashboardCardsDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        let {recruiterId} = req.params;
        const dashboardCardsDetails = await recruiterDashboardCardsDetailsUseCase(dependencies).execute(recruiterId);
        res.status(200).json({message: "dashboard card details", data: dashboardCardsDetails })
    };

}