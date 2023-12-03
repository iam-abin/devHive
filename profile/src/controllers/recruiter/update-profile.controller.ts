import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: {  getRecruiterProfileByIdUseCase ,updateRecruiterProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        console.log("in recruiter update profile controller data: ",updatedData);
        const { id } = req.body
        const existingData = await getRecruiterProfileByIdUseCase(dependencies).execute(id);
        

        const recruiter = await updateRecruiterProfileUseCase(dependencies).execute(existingData, updatedData);
        console.log("in recruiter update profile controller recruiter: ",recruiter);



        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}