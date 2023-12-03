import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createRecruiterProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter create profile controller data: ",data);
        

        const recruiter = await createRecruiterProfileUseCase(dependencies).execute(data);
        console.log("in recruiter create profile controller recruiter: ",recruiter);

        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}