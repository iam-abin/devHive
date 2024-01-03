import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllAppliedJobsUseCase, getNumberofCandidateAppliedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {candidateId} = req.params;

        // pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 1;
		const skip = (page - 1) * limit;
        console.log("in  appled jobs controller 1: ",candidateId);

        const appliedJobs = await getAllAppliedJobsUseCase(dependencies).execute(candidateId, skip, limit);

        const totalJobs = await getNumberofCandidateAppliedJobsUseCase(dependencies).execute(candidateId)
		const numberOfPages = Math.ceil(totalJobs/limit);
        console.log("in  appled jobs controller 2: ",appliedJobs);


        res.status(200).json({message: "Applied Jobs are", data: appliedJobs, totalNumberOfPages: numberOfPages  })
    };

}