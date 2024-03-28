import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { verifyOtp } from "../../frameworks/utils/twilio";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			let { phone, otp, email } = req.body;
			
			// write code go get user using phone number and continue if the phone number exists in out db
			const isExistingUser = await getUserByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"});
				throw new BadRequestError("User with this phone number is not existing");
			}
			
			const verifyOtpData = await verifyOtp(phone, otp);
			
			if(verifyOtpData === "pending"){
				return res.status(200).json({message: `Invalid otp,`, data: verifyOtpData});
			}else{
				return res.status(200).json({message: `Otp Verified successfully`, data: verifyOtpData});
			}
			
	};
};