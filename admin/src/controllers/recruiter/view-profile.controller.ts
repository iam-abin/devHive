import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getRecruiterByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const recruiter = await getRecruiterByIdUseCase(dependencies).execute({
            id
        });

        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}