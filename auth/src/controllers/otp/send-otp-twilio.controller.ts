import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { sendOtp } from "../../frameworks/utils/twilio";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: { getUserByPhoneUseCase, getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			let { email, phone } = req.body;

			phone = parseInt(phone);

            // check user exist
			const isExistingUser = await getUserByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})
				throw new BadRequestError("User with this phone number is not existing");
			}

			if (isExistingUser.phone != phone) throw new BadRequestError("User with this phone number is not existing");
			
			// sendOtp
			const otpData = await sendOtp(phone);
			
            res.status(200).json({message: `Otp send to ${phone}`, data: isExistingUser});
	};
};