import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		useCases: { changeClosejobStatusUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { jobId } = req.params;
		const {userId} = req.currentUser!
		const job = await changeClosejobStatusUseCase(
			dependencies
		).execute(jobId, userId);
		
		res.status(200).json({
			message: `close status updated to ${job?.isActive? "Close": "Open"}`,
			data: job,
		});
	};
};
