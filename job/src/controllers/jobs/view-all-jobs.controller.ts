import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { getAllJobApplicationsUseCase } from "../../useCases/recruiter";
import { NotAuthorizedError } from "@abijobportal/common";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAllJobsUseCase, getNumberofJobsUseCase, getAllJobApplicationsUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		console.log("in getAll job controller 1: ");
		console.log("req.params.page ",req.params.page);
		
		// const candidateId = req.currentUserCandidate!?.id || null;
		let candidateId
		if (!req.currentUserCandidate) {
			// throw new NotAuthorizedError();
			candidateId = null
		}else{
			candidateId =  req.currentUserCandidate!.id
		}
		// candidateId = req?.currentUserCandidate ? req.currentUserCandidate!.id : null;

		// candidateId = null


		console.log(candidateId,"jkdddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
		

		// pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 2;
		const skip = (page - 1) * limit;

		let applicationJobIds;
		let jobApplications;
		if(candidateId){
			jobApplications = await getAllJobApplicationsUseCase(dependencies).execute(null, candidateId);
			applicationJobIds = jobApplications.map((application: any) => application.jobId?._id.toString());
		}
		
		let jobs;
		let totalJobs;
		if(applicationJobIds){
			jobs = await getAllJobsUseCase(dependencies).execute(skip, limit, applicationJobIds);
			totalJobs = await getNumberofJobsUseCase(dependencies).execute(applicationJobIds)
		}
		else{
			jobs = await getAllJobsUseCase(dependencies).execute(skip, limit); // for recruiter or list if not login
			totalJobs = await getNumberofJobsUseCase(dependencies).execute()

		}

		console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
		console.log("job applications ========= ",jobApplications);
		console.log("job applicationJobIds ========= ",applicationJobIds);
		console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
		


		const numberOfPages = Math.ceil(totalJobs/limit);


		console.log("in getAll job controller 2: ^^^^^^^^^^^^^^ ", jobs);
		console.log("in get totalJobs controller 2: ^^^^^^^^^^^^^^ ", totalJobs);
		
		console.log("in numberOfPages controller 2: ^^^^^^^^^^^^^^ ", numberOfPages);

		res.status(200).json({ message: "Jobs list", data: jobs, totalNumberOfPages: numberOfPages });
	};
};
