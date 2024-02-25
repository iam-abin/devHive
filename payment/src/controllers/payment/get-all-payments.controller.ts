import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createPaymentUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params
        console.log("in  get all chatroom controller 1: ",userId);

        const payment = await createPaymentUseCase(dependencies).execute(userId);
        console.log("in  get all chatroom controller 2: ",payment);


        res.status(200).json({message: "Chat rooms are ", data: payment })
    };

}