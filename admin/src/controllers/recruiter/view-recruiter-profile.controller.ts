import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getRecruiterProfileByuserIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const {userId} = req.params;
        console.log(" in getRecruiterByIdController", userId);
        

        const recruiter = await getRecruiterProfileByuserIdUseCase(dependencies).execute(userId);
        console.log(" in getRecruiterByIdController result", recruiter);

        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}