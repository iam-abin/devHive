import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAJobApplicationUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {jobApplicationId} = req.params;
        console.log("in  view a Job Application controller 1: ",jobApplicationId);

        const application = await getAJobApplicationUseCase(dependencies).execute(jobApplicationId);
        console.log("in view a Job Applications controller 2: ",application);


        res.status(200).json({message: "Job applications are ", data: application })
    };

}