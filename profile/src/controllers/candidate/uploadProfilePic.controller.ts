import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { IFileData } from "../../frameworks/types/candidate";

export = (dependencies: IDependency)=>{

    const { useCases: { uploadCandidateProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser; 
        
        const candidate = await uploadCandidateProfilePicUseCase(dependencies).execute(userId ,req.file as IFileData);
        
        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}