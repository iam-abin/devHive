import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getRecruiterProfileByEmailUseCase ,createRecruiterProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter create profile controller data: ",data);
        const { email } = req.body
        const profile = await getRecruiterProfileByEmailUseCase(dependencies).execute(email);
        if(profile){
            throw new BadRequestError("profile already exist")
        }
        

        const recruiter = await createRecruiterProfileUseCase(dependencies).execute(data);
        console.log("in recruiter create profile controller recruiter: ",recruiter);

        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}