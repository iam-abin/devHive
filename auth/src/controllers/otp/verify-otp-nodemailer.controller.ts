import { Request, Response } from "express";
// import { BadRequestError } from "@abijobportal/common";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependenciesData) => {
	const {
		useCases: {
			checkEmailVerificationOtpUseCase,
			getUserByEmailUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { email, otp } = req.body;
		
		let parsedOtp;
		if(typeof otp == "string"){
			parsedOtp = parseInt(otp)
		}else{
			// no change
			parsedOtp = otp
		}
		


		const user = await getUserByEmailUseCase(dependencies).execute(email);
		if (!user) throw new BadRequestError("Invalid email");
			
		const checkOtp = await checkEmailVerificationOtpUseCase(
			dependencies
		).execute({ otp: parsedOtp, email });
		
		if(!checkOtp){

			return res.status(403).json({
				message: "invalid otp"
			});
		}
		
		res.status(200).json({
			message: "user is verified successfully",
			data: user,
		});
	};
};
