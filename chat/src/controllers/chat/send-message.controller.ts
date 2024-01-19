import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getUsersUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {message} = req.body
        console.log("in  Job Applications controller 1: ",message);

        const applications = await getUsersUseCase(dependencies).execute(message);
        console.log("in Job Applications controller 2: ",applications);


        res.status(200).json({message: "Job applications are ", data: applications })
    };

}