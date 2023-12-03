import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByEmailUseCase, createCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in candidate create profile controller id 1: ",data);
        const { email } = req.body
        const profile = await getCandidateProfileByEmailUseCase(dependencies).execute(email);
        if(profile){
            throw new BadRequestError("profile already exist")
        }
        

        const candidate = await createCandidateProfileUseCase(dependencies).execute(data);
        console.log("in canidiate create profile controller candidate 2: ",candidate);



        res.status(200).json({message: "candidate data", data: candidate })
    };

}