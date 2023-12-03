import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByIdUseCase, updateCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        console.log("in candidate update profile controller data: ",updatedData);
        const { id } = req.body
        const existingData = await getCandidateProfileByIdUseCase(dependencies).execute(id);
        

        const candidate = await updateCandidateProfileUseCase(dependencies).execute(existingData,updatedData);
        console.log("in canidiare update profile controller candidate: ",candidate);



        res.status(200).json({message: "candidate data after update", data: candidate })
    };

}