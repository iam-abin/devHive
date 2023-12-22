import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { NotAuthorizedError, verifyJwt } from "@abijobportal/common";
import { createJwtAccessToken } from "../../frameworks/utils/jwtToken";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { refreshToken } = req.body;
		const refreshTokenVerified: any = verifyJwt(
			refreshToken,
			process.env.JWT_REFRESH_SECRET_KEY!
		);
		let user = null;
		if (refreshTokenVerified) {
			user = await getUserByEmailUseCase(refreshTokenVerified?.email!);
		}

		const candidatePayloadData = {
			id: user?.id,
			name: user?.name,
			email: user?.email,
			phone: user?.phone,
			userType: user?.userType,
		};

		// Generate Jwt key
		const accessToken = createJwtAccessToken(candidatePayloadData);
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
