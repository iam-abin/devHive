import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: {getAllJobFieldsDistinctValuesUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		
		const jobFields: any = await getAllJobFieldsDistinctValuesUseCase(dependencies).execute(req.body);
		
		if (!jobFields) throw new Error('No jobFields are found');
		
		res.status(200).json({ message: "Jobs list", data: jobFields });
	};
};
