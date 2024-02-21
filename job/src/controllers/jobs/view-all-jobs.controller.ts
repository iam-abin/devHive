import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAllJobsUseCase, getNumberofJobsUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		console.log("in getAll job controller 1: ");
		console.log("req.params.page ",req.params.page);
		

		// pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 4;
		const skip = (page - 1) * limit;

		const jobs = await getAllJobsUseCase(dependencies).execute(skip, limit);

        const totalJobs = await getNumberofJobsUseCase(dependencies).execute()
		const numberOfPages = Math.ceil(totalJobs/limit);


		console.log("in getAll job controller 2: ", jobs);

		res.status(200).json({ message: "Jobs list", data: jobs, totalNumberOfPages: numberOfPages });
	};
};
