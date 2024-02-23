import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: {getAllJobFieldsDistinctValuesUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		console.log("=========in viewAllJobFieldsDistinctValuesController controller 1: ", req.body);

		const jobFields: any = await getAllJobFieldsDistinctValuesUseCase(dependencies).execute(req.body);
		
		if (!jobFields) {
			throw new Error('No jobFields are found');
		  }

		console.log("in getAll job controller 2: ", jobFields);

		res.status(200).json({ message: "Jobs list", data: jobFields });
	};
};
