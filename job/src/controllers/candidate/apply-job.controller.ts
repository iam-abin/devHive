import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: { applyJobUseCase, getAnAppliedJobUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { userId } = req.currentUser!; // candidateId
		const {jobId} = req.body;
		
		const applied = await applyJobUseCase(dependencies).execute(
			userId, jobId
		);
		
		res.status(200).json({
			message: "Job applied successfully",
			data: applied,
		});
	};
};
