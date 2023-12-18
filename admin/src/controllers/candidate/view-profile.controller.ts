import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByuserIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        console.log("in side get candidate id profile by id controller ", userId);
        

        const candidate = await getCandidateProfileByuserIdUseCase(dependencies).execute(userId);

        res.status(200).json({message: "candidate data", data: candidate })
    };

}