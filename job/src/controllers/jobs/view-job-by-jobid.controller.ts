import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getJobByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in get job controller 111: ",id);

        const response = await getJobByIdUseCase(dependencies).execute(id);
        console.log("in get job controller 2: ",response);

        if(response == null){
            throw new BadRequestError("invalid job Id")
        }
        
        res.status(200).json({message: "Job get successfully", data: response })

    };

}