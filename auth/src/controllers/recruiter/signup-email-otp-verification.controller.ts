import { Request, Response } from "express";
// import { BadRequestError } from "@abijobportal/common";

import {
	createJwtAccessToken,
	createJwtRefreshToken,
} from "../../frameworks/utils/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";
import { UserCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { checkEmailVerificationOtpUseCase, getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { email, otp } = req.body;
		
		let parsedOtp;
		if (typeof otp == "string") {
			parsedOtp = parseInt(otp);
		} else {
			// no change
			parsedOtp = otp;
		}

		const user = await getUserByEmailUseCase(dependencies).execute(email);
		if (!user) throw new BadRequestError("Invalid email"); 
		
		const checkOtp = await checkEmailVerificationOtpUseCase(
			dependencies
		).execute({ otp: parsedOtp, email });

		if (!checkOtp) {
			return res.status(403).json({
				message: "invalid otp",
			});
		}
		
		// to produce a message to kafka topic
		const userCreatedEvent = new UserCreatedEventPublisher(kafkaClient);
		await userCreatedEvent.publish({
			name: user.name,
			email: user.email,
			phone: user.phone,
			userType: user.userType,
			isActive: user.isActive,
			userId: user.id,
		});

		const recruiterPayloadData = {
			id: user.id,
			email: user.email,
			userType: user.userType,
		};

		// Generate Jwt key
		const recruiterAccessToken = createJwtAccessToken(recruiterPayloadData);
		const recruiterRefreshToken =
			createJwtRefreshToken(recruiterPayloadData);
		// // Store it on session object
		// req.session = { recruiterToken: recruiterJWT };

		// // Store it on cookie
		// res.cookie("recruiterToken", recruiterJWT, { httpOnly: true });

		res.status(201).json({
			message: "user is registered successfully",
			data: user,
			recruiterAccessToken,
			recruiterRefreshToken,
		});
	};
};
