import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByuserIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const { id } = req.params;
        const userId = id
        console.log("in candidate view profile controller id: ",userId);
        

        const candidate = await getCandidateProfileByuserIdUseCase(dependencies).execute(userId);
        console.log("in canidiare view profile controller candidate: ",candidate);



        res.status(200).json({message: "candidate data", data: candidate })
    };

}