import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { changeClosejobStatusUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { jobId } = req.params;
		// const { jobApplicationStatus } = req.body;
		console.log("in changeJobCloseStatusController 1 jobId", jobId);

		// console.log("in  change-job-application-status.controllercontroller  1 jobApplicationId: ",jobApplicationId);
		// console.log("in  change-job-application-status.controllercontroller 1 jobApplicationStatus: ",jobApplicationStatus);

		const job = await changeClosejobStatusUseCase(
			dependencies
		).execute(jobId);
		console.log(
			"in changeJobCloseStatusController.controller 2: ",
			job
		);

		res.status(200).json({
			message: `close status updated to ${job?.isClosed? "Close": "Open"}`,
			data: job,
		});
	};
};
