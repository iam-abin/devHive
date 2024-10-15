import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { IDependency } from "../../frameworks/types/dependencyInterface";
import { sendOtp } from "../../frameworks/utils/twilio";
import { IMobileOtp } from "../../frameworks/types/otpInterface";

export = (dependencies: IDependency) => {
	const {
		useCases: { sendOtpMobileUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			let { email, phone } = req.body as Omit<IMobileOtp, "otp">;

			if(typeof phone === "string") phone = parseInt(phone);
			

            // check user exist
			const isExistingUser = await sendOtpMobileUseCase(
				dependencies
			).execute({email, phone});

			
			
            res.status(200).json({message: `Otp send to ${phone}`, data: isExistingUser});
	};
};