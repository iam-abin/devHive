import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const {
		useCases: { getAllMembershipPlansUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		
		const { membershipPlans, numberOfPages }  = await getAllMembershipPlansUseCase(dependencies).execute(
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4
        );
		
		res.status(200).json({ message: "memberShipPlans list", data: { membershipPlans, numberOfPages }  });
	};
};
