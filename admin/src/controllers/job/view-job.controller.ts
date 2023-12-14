import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getJobByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const job = await getJobByIdUseCase(dependencies).execute({
            id
        });

        res.status(200).json({message: "job data", data: job })
    };

}