import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		useCases: {getAllJobFieldsDistinctValuesUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		
		const jobFields: any = await getAllJobFieldsDistinctValuesUseCase(dependencies).execute(req.body);

		res.status(200).json({ message: "Jobs list", data: jobFields });
	};
};
