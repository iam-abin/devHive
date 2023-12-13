import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllCompaniesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const company = await getAllCompaniesUseCase(dependencies).execute();

        res.status(200).json({message: "all companies", data: company })
    };

}