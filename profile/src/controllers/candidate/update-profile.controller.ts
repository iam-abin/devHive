import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updateCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in candidate update profile controller data: ",data);
        

        const candidate = await updateCandidateProfileUseCase(dependencies).execute({
            data
        });
        console.log("in canidiare update profile controller candidate: ",candidate);



        res.status(200).json({message: "candidate data after update", data: candidate })
    };

}