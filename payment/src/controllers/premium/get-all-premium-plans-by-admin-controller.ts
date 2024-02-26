import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllPremiumPlansAdminUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const keyword = req.query.search
        console.log("in  Job Applications controller 1: ",keyword);

        const applications = await getAllPremiumPlansAdminUseCase(dependencies).execute(keyword);
        console.log("in Job Applications controller 2: ",applications);


        res.status(200).json({message: "Job applications are ", data: applications })
    };

}