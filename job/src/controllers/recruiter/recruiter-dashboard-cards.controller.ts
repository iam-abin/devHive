import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllRecruiterDashboardCardsDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        console.log("inside get all dashboard cards derails controller 111111");
        
        
        const dashboardCardsDetails = await getAllRecruiterDashboardCardsDetailsUseCase(dependencies).execute();


        console.log("inside get all dashboard cards derails controller 2",dashboardCardsDetails);

        res.status(200).json({message: "dashboard card details", data: dashboardCardsDetails })
    };

}