import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCompanyProfileByRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        
        const company = await getCompanyProfileByRecruiterUseCase(dependencies).execute(id);
        
        res.status(200).json({message: "company data", data: company })
    };

}