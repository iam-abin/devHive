import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { recruiterDashboardGraphDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {recruiterId} = req.params
        console.log(recruiterId);
        
        console.log("inside get all dashboard graph derails controller 1111====11", recruiterId);
        
        
        const dashboardCardsDetails = await recruiterDashboardGraphDetailsUseCase(dependencies).execute(recruiterId);


        console.log("inside get all dashboard graph derails controller 2",dashboardCardsDetails);

        res.status(200).json({message: "dashboard card details", data: dashboardCardsDetails })
    };

}