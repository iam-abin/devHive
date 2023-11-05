import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { produceMessage } from "../../frameworks/services/kafka/producer";

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

			// to produce a message to kafka topic
			await produceMessage(newUser);
			
			const candidatePayloadData = {
				id: newUser.id,
				email: newUser.email,
				userType: newUser.userType,
			};

			// Generate Jwt key
			const candidateJWT = createJwtToken(candidatePayloadData);

			// Store it on session object
			req.session = {
				candidateToken: candidateJWT,
			};

            // // Store it on cookie
			// res.cookie("candidateToken", candidateJWT, { httpOnly: true });
			res.status(201).json({
				message: "user is register successfully",
				data: newUser,
			});
	};
};
