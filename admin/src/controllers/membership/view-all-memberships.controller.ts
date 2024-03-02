import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAllMembershipPlansUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		console.log("in getAll memberShipPlans controller 1: ");
		console.log("req.params.page ",req.params.page);

		const memberShipPlans = await getAllMembershipPlansUseCase(dependencies).execute();

		console.log("in getAll memberShipPlans controller 2: ", memberShipPlans);

		res.status(200).json({ message: "memberShipPlans list", data: memberShipPlans });
	};
};
