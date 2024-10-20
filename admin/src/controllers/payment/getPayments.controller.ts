import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllPaymentsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const payment = await getAllPaymentsUseCase(dependencies).execute();
        
        res.status(200).json({message: "Payments are ", data: payment })
    };

}