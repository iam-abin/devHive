import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllPremiumPlansCandidateUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        // let candidateId = req.currentUser!.userId;

        const plans = await getAllPremiumPlansCandidateUseCase(dependencies).execute();
        
        res.status(200).json({message: "Premium plans are ", data: plans })
    };

}