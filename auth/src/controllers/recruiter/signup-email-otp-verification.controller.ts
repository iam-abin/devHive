import { Request, Response } from "express";
// import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { produceMessage } from "../../frameworks/services/kafka/producer";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { checkEmailVerificationOtpUseCase, getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { email, otp } = req.body;
		console.log("email ", email, "otp ", otp);

		const user = await getUserByEmailUseCase(dependencies).execute(email);
		if (!user) {
			throw new BadRequestError("Invalid email");
		}

		const checkOtp = await checkEmailVerificationOtpUseCase(
			dependencies
		).execute({ otp, email });

		if (!checkOtp) {
			return res.status(403).json({
				message: "invalid otp",
			});
		}

		console.log("email verified");

		
		// to produce a message to kafka topic
		await produceMessage(user);

		const recruiterPayloadData = {
			id: user.id,
			email: user.email,
			userType: user.userType,
		};

		// Generate Jwt key
		const recruiterJWT = createJwtToken(recruiterPayloadData);

		// Store it on session object
		req.session = { recruiterToken: recruiterJWT };

		// // Store it on cookie
		// res.cookie("recruiterToken", recruiterJWT, { httpOnly: true });

		res.status(201).json({
			message: "user is registered successfully",
			data: user,
		});
	};
};
