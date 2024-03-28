import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { generateEmailVerificationOtp, sendVerificationEmail } from "../../frameworks/utils/sendEmail";


export = (dependencies: DependenciesData) => {
	const {
		useCases: {  getUserByEmailUseCase, setNodemailerOtpUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			let { email } = req.body;
			
            // check user exist
			const isExistingUser = await getUserByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("User with this email number is not existing");
			}

			
			const {otp, expiryTime} = generateEmailVerificationOtp()
			
			const setOtp = await setNodemailerOtpUseCase(
				dependencies
			).execute({email, otp});

			const subject = "Verify Your Email";
			const topic = "Enter the 6 digit otp to verify your email"
			// sendOtp
			const response = await sendVerificationEmail(isExistingUser.email, otp ,subject ,topic);
			
			return res.status(200).json({"message": `An email is send to ${isExistingUser.email}, please verify.`});
	};
};