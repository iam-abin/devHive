import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { filterJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const filterData = req.body;
        
        const newJob = await filterJobUseCase(dependencies).execute(filterData );
        
        res.status(200).json({message: "Job filtered successfully", data: newJob })
    };

}