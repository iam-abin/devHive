import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { deleteResumeUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser;
        const candidate = await deleteResumeUseCase(dependencies).execute(userId);
        
        res.status(201).json({message: "resume deleted", data: candidate })
    };

}