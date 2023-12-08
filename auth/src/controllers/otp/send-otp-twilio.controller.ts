import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { sendOtp } from "../../frameworks/services/twilio";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByPhoneUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { email, phone } = req.body;

            // check user exist
			const isExistingUser = await getUserByPhoneUseCase(
				dependencies
			).execute(phone);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("User with this phone number is not existing");
			}

			// sendOtp
			const otpData = await sendOtp(phone);

            console.log("ooooooooooottttttttttpppppppppp",otpData,"ooooooooooottttttttttpppppppppp");
			
            res.status(200).json({message: `Otp send to ${phone}`, data: isExistingUser});
	};
};