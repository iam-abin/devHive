import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { verifyOtp } from "../../frameworks/services/twilio";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByPhoneUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { phone, otp } = req.body;

			// write code go get user using phone number and continue if the phone number exists in out db
			const isExistingUser = await getUserByPhoneUseCase(
				dependencies
			).execute(phone);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("User with this phone number is not existing");
			}

			// verifyOtp
			const verifyOtpData = await verifyOtp(phone, otp);

            console.log(verifyOtpData);
			
            console.log("ooooooooooottttttttttpppppppppp",verifyOtpData,"ooooooooooottttttttttpppppppppp");
			
			if(verifyOtpData === "pending"){
				return res.status(200).json({message: `Invalid otp,`, data: verifyOtpData});
			}else{
				return res.status(200).json({message: `Otp Verified successfully`, data: verifyOtpData});
			}
			
	};
};