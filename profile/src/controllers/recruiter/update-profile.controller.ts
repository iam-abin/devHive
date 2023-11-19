import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updateRecruiterProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter update profile controller data: ",data);
        

        const recruiter = await updateRecruiterProfileUseCase(dependencies).execute({
            data
        });
        console.log("in recruiter update profile controller recruiter: ",recruiter);



        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}