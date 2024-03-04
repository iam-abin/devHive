import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllPaymentsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params
        console.log("in  get all payments controller 1: ",userId);

        const payment = await getAllPaymentsUseCase(dependencies).execute();
        console.log("in  get all payments controller 2: ",payment);


        res.status(200).json({message: "Payments are ", data: payment })
    };

}