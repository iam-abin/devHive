import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllCompaniesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const company = await getAllCompaniesUseCase(dependencies).execute();

        res.status(200).json({message: "all companies", data: company })
    };

}