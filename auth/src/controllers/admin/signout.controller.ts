import { Request, Response } from "express";

export = (dependencies: any) => {
	return async (req: Request, res: Response) => {
		console.log(req.currentUser);
		
		res.cookie("adminToken", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		res.status(200).json({ message: "admin successfully logged out" });
	};
};
