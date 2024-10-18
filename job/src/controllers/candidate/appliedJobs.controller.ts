import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllAppliedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const { userId } = req.currentUser!;

        // pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 3;
		const skip = (page - 1) * limit;
        
        const {appliedJobs, appliedJobsCount} = await getAllAppliedJobsUseCase(dependencies).execute(userId, skip, limit);
        console.log(appliedJobs);
        

		const numberOfPages = Math.ceil(appliedJobsCount/limit);
        
        res.status(200).json({message: "Applied Jobs are", data: appliedJobs, totalNumberOfPages: numberOfPages  })
    };

}