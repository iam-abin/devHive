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
			if (authHeader.startsWith("Bearer ")) {
				refreshToken = authHeader.substring("Bearer ".length);
			}

			console.log("inside refresh token controller===== refreshToken ",refreshToken);
			
		}

		// const token = req.session?.adminToken
		// // const token = req.cookies?.adminToken;

		if (!refreshToken) {
			console.log(refreshToken, "nooo tokkkkkkkkkkkkkkken");
			throw new NotAuthorizedError();
			// return next(); // it will check 'req.currentUser' in the next middleware 'requireAuth'
		}
		console.log(refreshToken, "yesss tokkkkkkkkkkkkkkken");

		//------------------------------------------------------------------------------------------

		// const { refreshToken } = req.body;
		const refreshTokenVerified: any = verifyJwt(
			refreshToken,
			process.env.JWT_REFRESH_SECRET_KEY!
		);
		console.log(
			"refreshTokenVerified?.email! ",
			refreshTokenVerified?.email!
		);

		let user = null;
		if (refreshTokenVerified) {
			console.log(
				" in if refreshtokenVerified",
				refreshTokenVerified?.email!
			);

			user = await getUserByEmailUseCase(dependencies).execute(refreshTokenVerified?.email!);
		}
		console.log("user in token verify ", user);

		if (!user) {
			throw new NotAuthorizedError();
		}
		const userPayloadData = {
			id: user?.id,
			name: user?.name,
			email: user?.email,
			phone: user?.phone,
			userType: user?.userType,
		};

		// Generate Jwt key
		const accessToken = createJwtAccessToken(userPayloadData);
		console.log("new Access tiken in jwt refresh controller ", accessToken);

		if (accessToken) {
			return res.status(200).json({
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
