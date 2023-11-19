import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in candidate view profile controller id: ",id);
        

        const candidate = await getCandidateProfileByIdUseCase(dependencies).execute({
            id
        });
        console.log("in canidiare view profile controller candidate: ",candidate);



        res.status(200).json({message: "candidate data", data: candidate })
    };

}