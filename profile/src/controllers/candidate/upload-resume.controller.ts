import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadResumeUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        console.log("in candidate upload resume controller data 1: req.file",req.file);
        

        const candidate = await uploadResumeUseCase(dependencies).execute( req.file);
        console.log("in candidate upload resume controller data 2: ",candidate);
        res.status(201).json({message: "resume uploaded", data: candidate })
    };

}