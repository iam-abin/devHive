import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in candidate create profile controller id: ",data);
        

        const candidate = await createCandidateProfileUseCase(dependencies).execute({
            data
        });
        console.log("in canidiate create profile controller candidate: ",candidate);



        res.status(200).json({message: "candidate data", data: candidate })
    };

}