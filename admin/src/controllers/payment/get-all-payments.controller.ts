import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllPaymentsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;

        const payment = await getAllPaymentsUseCase(dependencies).execute();
        
        res.status(200).json({message: "Payments are ", data: payment })
    };

}