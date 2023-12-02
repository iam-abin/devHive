import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body.file;
        console.log("in candidate upload profile pic controller data 1: ",data);
        

        const candidate = await uploadProfilePicUseCase(dependencies).execute({
            data
        });
        console.log("in candidate upload profile pic controller data 2: ",candidate);



        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}