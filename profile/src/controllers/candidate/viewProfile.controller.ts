import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getCandidateProfileByUserIdUseCase}} = dependencies

    return async (req: Request, res: Response)=>{
        const { userId } = req.params;
        const candidate = await getCandidateProfileByUserIdUseCase(dependencies).execute(userId);
        res.status(200).json({message: "candidate profile feched successfully", data: candidate })
    };

}