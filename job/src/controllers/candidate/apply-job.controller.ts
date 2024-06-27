import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: { applyJobUseCase, getAnAppliedJobUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const jobApplicationPayload = req.body;
		
		const isApplicationExist = await getAnAppliedJobUseCase(
			dependencies
		).execute(
			jobApplicationPayload.candidateId,
			jobApplicationPayload.jobId
		);

		if (isApplicationExist) throw new BadRequestError("you have already applied for this job"); 

		jobApplicationPayload.recruiterId = jobApplicationPayload.recruiterId.id
		const applied = await applyJobUseCase(dependencies).execute(
			jobApplicationPayload
		);
		
		res.status(200).json({
			message: "Job applied successfully",
			data: applied,
		});
	};
};
