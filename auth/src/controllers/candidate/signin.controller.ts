import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { comparePassword } from "../../frameworks/utils/password";
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

		// check user exist
		const isExistingUser = await getUserByEmailUseCase(
			dependencies
		).execute(email);

		if (!isExistingUser) {
			// return res.status(400).json({message:"Invalid email or password"})

			throw new BadRequestError("Invalid email or password");
		}

		// check password is correct
		const isSamePassword = await comparePassword(
			password,
			isExistingUser.password
		);

		if (!isSamePassword) {
			// return res.status(400).json({message:"Invalid email or passwordd"})

			throw new BadRequestError("Invalid email or passwordd");
		}

		if (!isExistingUser.isActive) {
			// return res.status(400).json({message:"Invalid email or passwordd"})

			throw new BadRequestError("This is a blocked user");
		}

		// Generate Jwt
		const candidatePayloadData = {
			id: isExistingUser.id,
			name: isExistingUser.name,
			email: isExistingUser.email,
			phone: isExistingUser.phone,
			userType: isExistingUser.userType,
		};

		// Generate Jwt key
		const candidateAccessToken = createJwtAccessToken(candidatePayloadData);
		const candidateRefreshToken =
			createJwtRefreshToken(candidatePayloadData);

		// // Store it on session object
		// req.session!.candidateToken = candidateJWT;

		// // Store it on cookie
		// res.cookie('candidateToken', candidateJWT, { httpOnly: true })

		res.status(200).json({
			message: "Login successful",
			data: isExistingUser,
			candidateAccessToken,
			candidateRefreshToken,
		});
	};
};
