import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { NotAuthorizedError, verifyJwt } from "@abijobportal/common";
import { createJwtAccessToken } from "../../frameworks/utils/jwtToken";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		
		let refreshToken;
		if (req.headers.authorization) {
		  const authHeader = req.headers.authorization;
		  if (authHeader.startsWith('Bearer ')) {
			refreshToken = authHeader.substring('Bearer '.length);
		  }
		}
	
		// const token = req.session?.adminToken
		// // const token = req.cookies?.adminToken;
	
		if (!refreshToken) throw new NotAuthorizedError();
		
		const refreshTokenVerified: any = verifyJwt(
			refreshToken,
			process.env.JWT_REFRESH_SECRET_KEY!
		);
		
		let user = null;
		if (refreshTokenVerified) {
			user = await getUserByEmailUseCase(refreshTokenVerified?.email!);
		}
		
		if(!user) throw new NotAuthorizedError();

		const userPayloadData = {
			id: user?.id,
			name: user?.name,
			email: user?.email,
			phone: user?.phone,
			userType: user?.userType,
		};

		// Generate Jwt key
		const accessToken = createJwtAccessToken(userPayloadData);
		
		if (accessToken) {
			return res
				.status(200)
				.json({
					message: "access token created",
					data: user,
					accessToken,
					refreshToken,
				});
		} else {
			throw new NotAuthorizedError();
		}
	};
};
