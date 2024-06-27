import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getJobByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {jobId} = req.params;
        

        const job = await getJobByIdUseCase(dependencies).execute(jobId);

        res.status(200).json({message: "job data", data: job })
    };

}