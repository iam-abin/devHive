import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	return async (req: Request, res: Response) => {
		res.status(200).json({ message: "recruiter successfully logged out" });
	};
};
