import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createPremiumPlanUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const premiumData = req.body
        console.log("in createPremiumPlan controller 1: ",premiumData);

        const applications = await createPremiumPlanUseCase(dependencies).execute(premiumData);
        console.log("increatePremiumPlan controller 2: ",applications);


        res.status(200).json({message: "Job applications are ", data: applications })
    };

}