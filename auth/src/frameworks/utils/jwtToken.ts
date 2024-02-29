import jwt from "jsonwebtoken";

export const createJwtAccessToken = (payload: {
	id: string;
	name?: string;
	email: string;
	phone?: string;
	userType: string;
	isActive?: boolean
}) => {
	console.log("inside createdJwtToken payload", payload);

	const createdJwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
		expiresIn: "15m",
	});

	return createdJwtToken;
};

export const createJwtRefreshToken = (payload: {
	id: string;
	name?: string;
	email: string;
	phone?: string;
	userType: string;
	isActive?: boolean
}) => {
	console.log("inside createJwtRefreshToken payload", payload);
	
	const createdJwtToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY!, {
		expiresIn: "30d",
	});

	return createdJwtToken;
};


