import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { verifyOtp } from "../../frameworks/services/twilio";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getUserByPhoneUseCase, getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			let { phone, otp, email } = req.body;
			phone = parseInt(phone)
			otp = parseInt(otp)

			console.log(`in verify otp twilio phone ${phone} otp ${otp} email ${email}`);
			console.log(`in verify otp twilio phone `, typeof phone);
			console.log(`in verify otp twilio otp `, typeof otp);
			console.log(`in verify otp twilio email `, typeof email);
			
			// write code go get user using phone number and continue if the phone number exists in out db
			const isExistingUser = await getUserByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("User with this phone number is not existing");
			}

			// verifyOtp
			console.log(isExistingUser);
			
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