import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllCandidatesProfilesUseCase, getNumberofCandidatesProfilesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        // pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 2;
		const skip = (page - 1) * limit;
        
        const candidates = await getAllCandidatesProfilesUseCase(dependencies).execute(skip, limit);

        const totalJobs = await getNumberofCandidatesProfilesUseCase(dependencies).execute()
		const numberOfPages = Math.ceil(totalJobs/limit);
        
        res.status(200).json({message: "candidate data", data: candidates, totalNumberOfPages: numberOfPages  })
    };

}