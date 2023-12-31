import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return async (req: Request, res: Response) => {
		console.log(req.currentUserAdmin, "req.currentUser in admin controller");
		console.log(req.headers, "req.headers in admin controller");

		// res.cookie("adminToken", "", {
		// 	httpOnly: true,
		// 	expires: new Date(0),
		// });

		// req.session!.adminToken = null
		res.status(200).json({ message: "admin successfully logged out" });
	};
};
