import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadResumeUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body.file;
        console.log("in candidate upload resume controller data 1: ",data);
        

        const candidate = await uploadResumeUseCase(dependencies).execute({
            data
        });
        console.log("in candidate upload resume controller data 2: ",candidate);



        res.status(201).json({message: "resume uploaded", data: candidate })
    };

}