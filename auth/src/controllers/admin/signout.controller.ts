import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return async (req: Request, res: Response) => {
		
		// res.cookie("adminToken", "", {
		// 	httpOnly: true,
		// 	expires: new Date(0),
		// });

		// req.session!.adminToken = null
		res.status(200).json({ message: "admin successfully logged out" });
	};
};
