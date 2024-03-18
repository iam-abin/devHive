import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllPremiumPlansCandidateUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{

        console.log("in  getAllPremiumPlansByCandidateController 1: ");

        const plans = await getAllPremiumPlansCandidateUseCase(dependencies).execute();
        console.log("in getAllPremiumPlansByCandidateController 2: ",plans);


        res.status(200).json({message: "Premium plans are ", data: plans })
    };

}