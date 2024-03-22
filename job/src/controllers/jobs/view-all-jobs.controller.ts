import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { getAllJobApplicationsUseCase } from "../../useCases/recruiter";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAllJobsUseCase, getNumberofJobsUseCase, getAllJobApplicationsUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		console.log("in getAll job controller 1: ");
		console.log("req.params.page ",req.params.page);
		
		// const candidateId = req.currentUserCandidate!.id;
		// // const candidateId = null

		// console.log(candidateId,"jkdddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
		

		// pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 4;
		const skip = (page - 1) * limit;

		let applicationJobIds;
		// if(candidateId){
		// 	let jobApplications = await getAllJobApplicationsUseCase(dependencies).execute(candidateId);
		// 	applicationJobIds = jobApplications.map((application: any) => application.jobId);
		// }else{
			let jobApplications = await getAllJobApplicationsUseCase(dependencies).execute();
		// }

		let jobs;
		let totalJobs;
		// if(applicationJobIds){
		// 	jobs = await getAllJobsUseCase(dependencies).execute(skip, limit, applicationJobIds);
		// 	totalJobs = await getNumberofJobsUseCase(dependencies).execute(applicationJobIds)
		// }else{
			jobs = await getAllJobsUseCase(dependencies).execute(skip, limit);
			totalJobs = await getNumberofJobsUseCase(dependencies).execute()

		// }


		const numberOfPages = Math.ceil(totalJobs/limit);


		console.log("in getAll job controller 2: ", jobs);

		res.status(200).json({ message: "Jobs list", data: jobs, totalNumberOfPages: numberOfPages });
	};
};
