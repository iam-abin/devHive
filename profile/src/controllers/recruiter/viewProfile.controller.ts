import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getRecruiterProfileByUserIdUseCase }} = dependencies
    

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser!
        const recruiter = await getRecruiterProfileByUserIdUseCase(dependencies).execute(userId);
        
        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}