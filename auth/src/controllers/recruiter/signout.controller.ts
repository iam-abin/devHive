import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return async (req: Request, res: Response) => {
		console.log(req.currentUserRecruiter, "req.currentUser in recruiter controller");

		req.session!.recruiterToken = null
		res.status(200).json({ message: "recruiter successfully logged out" });
	};
};
