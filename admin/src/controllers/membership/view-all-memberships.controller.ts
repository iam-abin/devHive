import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAllMembershipPlansUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		
		const memberShipPlans = await getAllMembershipPlansUseCase(dependencies).execute();
		
		res.status(200).json({ message: "memberShipPlans list", data: memberShipPlans });
	};
};
