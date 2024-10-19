import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getRecruiterProfileByUserIdUseCase }} = dependencies
    

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        
        const recruiter = await getRecruiterProfileByUserIdUseCase(dependencies).execute(id);
        
        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}