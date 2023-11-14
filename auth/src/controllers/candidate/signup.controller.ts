import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { produceMessage } from "../../frameworks/services/kafka/producer";
import { generateEmailVerificationToken, sendVerificationEmail } from "../../frameworks/services/sendEmail";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { candidateSignupUseCase, getCandidateByEmailUseCase, createEmailVerificationTokenUseCase },
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

			const emailVerificationToken = generateEmailVerificationToken()
			console.log("-------newUser",newUser);
			console.log("-------newUser._id",newUser._id);
			console.log("-------emailVerificationToken",emailVerificationToken);
			
			// to add values to token collection, 
			const emailVerify = await createEmailVerificationTokenUseCase(dependencies).execute({
				userId: newUser._id,
				token: emailVerificationToken,
				email: newUser.email

			});

			console.log("token collection created",emailVerify);
			
			await sendVerificationEmail(newUser.email,emailVerify.userId,emailVerify.token, "Verify Yout Email","click on the following link to verify your email account!");
			console.log("email sended");
			res.status(200).json({"message": "An email is send to your email, please verify."});
	};
};
