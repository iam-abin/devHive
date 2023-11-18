import { Request, Response } from "express";
// import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { produceMessage } from "../../frameworks/services/kafka/producer";
// import {
// 	generateEmailVerificationToken,
// 	sendVerificationEmail,
// } from "../../frameworks/services/sendEmail";

export = (dependencies: DependenciesData) => {
	const {
		useCases: {
			signupEmailVerificationTokenUseCase,
			getCandidateByEmailUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { userId, token } = req.params;
		console.log("userId",userId,"token",token);
		
        
		const checkToken = await signupEmailVerificationTokenUseCase(
			dependencies
		).execute({
			userId,
			token,
		});

		console.log("checktoken", checkToken);
		console.log("checktoken.email", checkToken.email);
		

		if (!checkToken) {
			console.log("register error or email verification failed");
			throw new Error("register error or email verification failed");
		}

        console.log("email verified");
        
		const user = await getCandidateByEmailUseCase(dependencies).execute(checkToken.email);

		// to produce a message to kafka topic
		await produceMessage(user);

		const candidatePayloadData = {
			id: user.id,
			email: user.email,
			userType: user.userType,
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
			message: "user is registered successfully",
			data: user,
		});
	};
};
