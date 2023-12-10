import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {candidateId, profile_pic_url} = req.body;
        console.log("in candidate upload profile pic controller data 1: ",profile_pic_url);
        

        const candidate = await uploadProfilePicUseCase(dependencies).execute({
           candidateId, profile_pic_url
        });
        console.log("in candidate upload profile pic controller data 2: ",candidate);



        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}