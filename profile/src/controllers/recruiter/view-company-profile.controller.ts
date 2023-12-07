import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCompanyProfileByRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in company view profile controller id: ",id);
        
        const company = await getCompanyProfileByRecruiterUseCase(dependencies).execute(id);
        console.log("in canidiare view profile controller company: ",company);



        res.status(200).json({message: "company data", data: company })
    };

}