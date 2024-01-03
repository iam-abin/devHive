import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	email: string;
	userType: string;
}

// to reach to an existing type definition or interface of 'Request' and make a modification to it

// here we are telling ts that , inside of the express project ,find the predefined Interface of
// Request and add following modifiations

declare global {
	namespace Express {
		interface Request {
			currentUserCandidate?: UserPayload; // '?' indicate if currentUser is defined
		}
	}
}

export const currentUserCandidateCheck = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token = null;
	console.log("in currentUserCandidateCheck req.headers ", req.headers);

	if (req.headers.authorization) {
		const authHeader = req.headers.authorization;
		if (authHeader.startsWith("Bearer ")) {
			token = authHeader.substring("Bearer ".length);
		}
	}
	// if (!req.session?.candidateToken) {
	// 	return next();  // it will be checked 'req.currentUser' in the next middleware 'requireAuth'
	// }
	console.log(token, "is jwt tokkkkkkkkkkkkkkken");
	// const token = req.session?.candidateToken
	// // const token = req.cookies?.candidateToken;
	if (token == null) {
		console.log(token, "nooo tokkkkkkkkkkkkkkken");
		return next(); // it will check 'req.currentUser' in the next middleware 'requireAuth'
	}

	console.log(token, "yesss tokkkkkkkkkkkkkkken");

	try {
		console.log("in try");

		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY!
		) as UserPayload;

		console.log(
			payload,
			"after jwt verify from common currentUserCandidate "
		);
		if (payload && payload.email) {
			if (payload.userType === "candidate") {
				req.currentUserCandidate = payload;
			}
		}

		// req.currentUserCandidate = payload;
		console.log(req.currentUserCandidate, "req.currentUserCandidate");
	} catch (error) {
		console.error(
			error,
			"currentUserCandidate middleware tocken verify error "
		); // Log the error for debugging purposes
		// return res.status(401).json({ error: 'Unauthorized' });
	}
	next();
};
