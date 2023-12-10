import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadResumeUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {candidateId, resume_url} = req.body;
        console.log("in candidate upload resume controller data 1: ",resume_url);
        

        const candidate = await uploadResumeUseCase(dependencies).execute({
            candidateId, resume_url
        });
        console.log("in candidate upload resume controller data 2: ",candidate);



        res.status(201).json({message: "resume uploaded", data: candidate })
    };

}