import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: { getAllJobsUseCase, getNumberofJobsUseCase, getAllJobApplicationsUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		let candidateId: string | undefined = req.currentUser?.userId
		
		// pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 2;
		const skip = (page - 1) * limit;

			let {jobs, jobCount } = await getAllJobsUseCase(dependencies).execute(skip, limit); // for recruiter or list if not login

		
		const numberOfPages = Math.ceil(jobCount/limit);
		
		res.status(200).json({ message: "Jobs list", data: jobs, totalNumberOfPages: numberOfPages });
	};
};
