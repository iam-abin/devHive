import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { sendOtp } from "../../frameworks/services/twilio";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getCandidateByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { email, phone } = req.body;

            // check user exist
			const isExistingUser = await getCandidateByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("Invalid User");
			}

			// sendOtp
			const candidateOtpData = await sendOtp(phone);

            console.log("ooooooooooottttttttttpppppppppp",candidateOtpData,"ooooooooooottttttttttpppppppppp");
            
            // if(candidateOtpData){

            // }

            res.status(200).json({message: `Otp send to ${phone}`, data: isExistingUser});
	};
};