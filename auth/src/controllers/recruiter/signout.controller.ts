import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return async (req: Request, res: Response) => {
		console.log(req.currentUserRecruiter, "req.currentUser in recruiter controller");
		
		res.cookie("recruiterToken", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		// req.session!.recruiterToken = null
		res.status(200).json({ message: "recruiter successfully logged out" });
	};
};
