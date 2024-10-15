import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { getJobByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        
        const job = await getJobByIdUseCase(dependencies).execute(id);
        
        if(!job) throw new NotFoundError("Job not found");
        
        res.status(200).json({message: "Job get successfully", data: job })

    };

}