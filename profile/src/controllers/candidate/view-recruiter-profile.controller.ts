import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getRecruiterProfileByUserIdUseCase }} = dependencies
    

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        
        const recruiter = await getRecruiterProfileByUserIdUseCase(dependencies).execute(id);
        
        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}