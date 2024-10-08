import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { generateEmailVerificationOtp, sendVerificationEmail } from "../../frameworks/utils/sendEmail";
import { IUserAttributes } from "../../frameworks/database/mongo/models/users";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: { userSignupUseCase, getUserByEmailUseCase},
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { name, email, phone, password } = req.body as Partial<IUserAttributes>;
			
			const isExistingUser = await getUserByEmailUseCase(
				dependencies
			).execute(email);

			if (isExistingUser && isExistingUser.isVarified) throw new BadRequestError("Email already exist");

			const subject = "Verify Your Email";
			const topic = "Enter the 6 digit otp to verify your email"
			if(isExistingUser && !isExistingUser.isVarified){
				const response = await sendVerificationEmail(isExistingUser.email, isExistingUser.otp ,subject ,topic);
				return res.status(200).json({"message": "An email is send to your email, please verify."});
			}

			const { otp } = generateEmailVerificationOtp()
			
			const newUser = await userSignupUseCase(dependencies).execute({
				name,
				email,
				phone,
				password,
				userType: "recruiter",
				otp: otp
			});

			if (!newUser) {
				console.error("register error");
			}

			const response = await sendVerificationEmail(newUser.email, newUser.otp ,subject ,topic);
			
			return res.status(200).json({"message": "An email is send to your email, please verify."});
	};
};
