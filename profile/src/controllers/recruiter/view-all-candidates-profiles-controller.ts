import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllCandidatesProfilesUseCase, getNumberofCandidatesProfilesUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        // pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 2;
		const skip = (page - 1) * limit;
        console.log("in getAll candidate profile controller 1: ");
        

        const candidates = await getAllCandidatesProfilesUseCase(dependencies).execute(skip, limit);

        const totalJobs = await getNumberofCandidatesProfilesUseCase(dependencies).execute()
		const numberOfPages = Math.ceil(totalJobs/limit);

        console.log("in getAll candidate profile controller 2: ",candidates);



        res.status(200).json({message: "candidate data", data: candidates, totalNumberOfPages: numberOfPages  })
    };

}