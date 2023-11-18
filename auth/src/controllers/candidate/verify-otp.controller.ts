import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { verifyOtp } from "../../frameworks/services/twilio";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getCandidateByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { phone, otp } = req.body;

            // check user existsend to ${phone}
			// const isExistingUser = await getCandidateByEmailUseCase(
			// 	dependencies
			// ).execute(email);

			// if (!isExistingUser) {
            //     // return res.status(400).json({message:"Invalid email or password"})

			// 	throw new BadRequestError("Invalid User");
			// }

			// verifyOtp
			const verifyOtpData = await verifyOtp(phone, otp);

            console.log(verifyOtpData);

            // if (condition) {
                
            // } else {
            //     throw new BadRequestError("Invalid otp");
            // }
            

            console.log("ooooooooooottttttttttpppppppppp",verifyOtpData,"ooooooooooottttttttttpppppppppp");
            
            // if(candidateOtpData){

            // }

            res.status(200).json({message: `Otp Verified successfully`, data: verifyOtpData});
	};
};