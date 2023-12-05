import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getJobByIdRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in get job controller 1: ",id);

        const response = await getJobByIdRecruiterUseCase(dependencies).execute(id);
        console.log("in get job controller 2: ",response);


        res.status(200).json({message: "Job get successfully", data: response })
    };

}