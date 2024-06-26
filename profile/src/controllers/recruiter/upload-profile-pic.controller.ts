import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { uploadProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body.file;
        
        const candidate = await uploadProfilePicUseCase(dependencies).execute({
            data
        });
        
        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}