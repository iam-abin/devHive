import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import {
	createJwtAccessToken,
	createJwtRefreshToken,
} from "../../frameworks/utils/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { email, password } = req.body;

		// check admin exist
		const isExistingUser = await getUserByEmailUseCase(
			dependencies
		).execute(email);

		if (!isExistingUser) {
			// return res.status(400).json({message:"Invalid email or password"})

			throw new BadRequestError("Invalid email or password");
		}

		// check password is correct
		const isSamePassword = password === isExistingUser.password;

		if (!isSamePassword) {
			// return res.status(400).json({message:"Invalid email or passwordd"})

			throw new BadRequestError("Invalid email or passwordd");
		}

		// Generate Jwt
		const adminPayloadData = {
			id: isExistingUser.id,
			email: isExistingUser.email,
			userType: isExistingUser.userType,
		};

		// Generate a Jwt access token
		const adminAccessToken = createJwtAccessToken(adminPayloadData);
		const adminRefreshToken = createJwtRefreshToken(adminPayloadData);

		// // // Store it on session object
		// req.session!.adminToken = adminJWT;

		// // Store it on cookie
		// res.cookie('adminToken', adminJWT, { httpOnly: true })

		res.status(200).json({
			message: "Login successfull",
			data: isExistingUser,
			adminAccessToken,
			adminRefreshToken,
		});
	};
};
