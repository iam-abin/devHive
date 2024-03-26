import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { generateEmailVerificationOtp, sendVerificationEmail } from "../../frameworks/utils/sendEmail";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { userSignupUseCase, getUserByEmailUseCase},
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { name, email, phone, password } = req.body;
			// const userData = req.body;
			console.log("in candidate signup controller" ,name, email, phone, password );
			

			const isExistingUser = await getUserByEmailUseCase(
				dependencies
			).execute(email);

			if (isExistingUser && isExistingUser.isVarified) {
				throw new BadRequestError("Email already exist");
			}

			const subject = "Verify Your Email";
			const topic = "Enter the 6 digit otp to verify your email"
			if(isExistingUser && !isExistingUser.isVarified){
				// const token = await getEmailVerifyTokenUseCase(dependencies).execute(email)
				const response = await sendVerificationEmail(isExistingUser.email, isExistingUser.otp ,subject ,topic);
				console.log("email sended response ", response);
				return res.status(200).json({"message": `An email is send to ${isExistingUser.email}, please verify.`});
			}
			// userData.password = await  // password hashing can be done in schema or model

			const {otp, expiryTime} = generateEmailVerificationOtp()
			console.log("-------emailVerificationOtp ",otp);
			console.log("-------expiryTime ",expiryTime);

			const newUser = await userSignupUseCase(dependencies).execute({
				name,
				email,
				phone,
				password,
				userType: "candidate",
				otp: otp
			});

			if (!newUser) {
				console.log("register error");
			}

			
			console.log("-------newUserCandidate ",newUser);
			console.log("-------newUser._id",newUser._id);

			// console.log("token collection created",emailVerify);
			const response = await sendVerificationEmail(newUser.email, newUser.otp ,subject ,topic);
			console.log("email sended response", response);
			return res.status(200).json({"message": `An email is send to ${newUser.email}, please verify.`});
	};
};
