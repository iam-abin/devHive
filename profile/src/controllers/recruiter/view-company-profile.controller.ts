import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency)=>{

    const { useCases: { getCompanyProfileByRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        
        const company = await getCompanyProfileByRecruiterUseCase(dependencies).execute(id);
        
        res.status(200).json({message: "company data", data: company })
    };

}