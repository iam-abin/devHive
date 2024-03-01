import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAllPaymentsUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		console.log("in getAll payments controller 1: ");
		console.log("req.params.page ",req.params.page);

		const payments = await getAllPaymentsUseCase(dependencies).execute();

		console.log("in getAll payments controller 2: ", payments);

		res.status(200).json({ message: "payments list", data: payments });
	};
};
