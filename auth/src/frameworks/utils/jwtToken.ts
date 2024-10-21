import { IJwtPayload } from "@abijobportal/common";
import jwt from "jsonwebtoken";

export const createJwtAccessToken = (payload: IJwtPayload) => {
	
	const createdJwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
		// expiresIn: "3h",
		expiresIn: "10d",
	});

	return createdJwtToken;
};

export const createJwtRefreshToken = (payload: IJwtPayload) => {
	
	const createdJwtToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY!, {
		expiresIn: "30d",
	});

	return createdJwtToken;
};


