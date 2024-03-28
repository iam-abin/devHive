import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return async (req: Request, res: Response) => {
		// req.session!.recruiterToken = null
		res.status(200).json({ message: "recruiter successfully logged out" });
	};
};
