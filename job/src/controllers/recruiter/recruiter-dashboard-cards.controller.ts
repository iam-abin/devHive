import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { recruiterDashboardCardsDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        let {recruiterId} = req.params
        console.log("inside get all dashboard cards derails controller 1111====11", recruiterId);
        
        
        const dashboardCardsDetails = await recruiterDashboardCardsDetailsUseCase(dependencies).execute(recruiterId);


        console.log("inside get all dashboard cards derails controller 2",dashboardCardsDetails);

        res.status(200).json({message: "dashboard card details", data: dashboardCardsDetails })
    };

}