import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@abijobportal/common"; 
export const requireAuthAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("in require auth middleware admin 1.", req.currentUserAdmin,"dffdfdf");

	if (!req.currentUserAdmin) {
		throw new NotAuthorizedError();
	}

	console.log("in require auth middleware admin 2.", req.currentUserAdmin,"dffdfdf");
	
	console.log("=======",req.currentUserAdmin.userType,"=======");
	
    if (req.currentUserAdmin.userType === "admin") {
        next();
	}

};
