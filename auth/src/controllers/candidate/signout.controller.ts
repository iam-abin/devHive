import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return async (req: Request, res: Response) => {
		console.log(req.currentUserCandidate, "req.currentUser in candidate controller");
		
		req.session!.candidateToken = null
		res.status(200).json({ message: "candidate successfully logged out" });
	};
};
