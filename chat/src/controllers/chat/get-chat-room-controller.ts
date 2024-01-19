import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getUsersUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {senderId} = req.params
        console.log("in  Job Applications controller 1: ",senderId);

        const applications = await getUsersUseCase(dependencies).execute(senderId);
        console.log("in Job Applications controller 2: ",applications);


        res.status(200).json({message: "Job applications are ", data: applications })
    };

}