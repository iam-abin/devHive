import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByCandidateIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const { candidateId } = req.params;
        console.log("in candidate view profile controller id: ",candidateId);
        

        const candidate = await getCandidateProfileByCandidateIdUseCase(dependencies).execute(candidateId);
        console.log("in canidiare view profile controller candidate: ",candidate);



        res.status(200).json({message: "candidate data", data: candidate })
    };

}