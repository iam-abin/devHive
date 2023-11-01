import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { updateRecruiterPasswordUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		try {
			const { id, password } = req.body;

			const user = await updateRecruiterPasswordUseCase(
				dependencies
			).execute({
				id,
				password,
			});

			res.status(200).json({ message: "password updated", data: user });
		} catch (error: any) {
			console.log(error.message);
		}
	};
};
