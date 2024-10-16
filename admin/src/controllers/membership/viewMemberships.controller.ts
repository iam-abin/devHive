import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		useCases: { getAllMembershipPlansUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		
		const memberShipPlans = await getAllMembershipPlansUseCase(dependencies).execute();
		
		res.status(200).json({ message: "memberShipPlans list", data: memberShipPlans });
	};
};
