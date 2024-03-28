import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllPremiumPlansCandidateUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        
        const plans = await getAllPremiumPlansCandidateUseCase(dependencies).execute();
        
        res.status(200).json({message: "Premium plans are ", data: plans })
    };

}