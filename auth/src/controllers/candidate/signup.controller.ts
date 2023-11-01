import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { candidateSignupUseCase, getCandidateByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { name, email, phone, password } = req.body;
			// const userData = req.body;

			const isExistingUser = await getCandidateByEmailUseCase(
				dependencies
			).execute(email);

			if (isExistingUser) {
                // return res.status(400).json({message:"Email already exist"})
				throw new BadRequestError("Email already exist");
			}

			// userData.password = await  // password hashing can be done in schema or model
			const newUser = await candidateSignupUseCase(dependencies).execute({
				name,
				email,
				phone,
				password,
				userType: "candidate",
			});

			if (!newUser) {
				console.log("register error");
			}

			const candidatePayloadData = {
				id: newUser.id,
				email: newUser.email,
				userType: newUser.userType,
			};

			// Generate Jwt key
			const candidateJWT = createJwtToken(candidatePayloadData);

			// Store it on session object
			// req.session = {
			// 	jwt: candidateJWT,
			// };

            // Store it on cookie
			res.cookie("candidateToken", candidateJWT, { httpOnly: true });
			res.status(201).json({
				message: "user is register successfully",
				data: newUser,
			});
	};
};
