import { Request, Response } from "express";
// import { BadRequestError } from "@abijobportal/common";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData) => {
	const {
		useCases: {
			checkEmailVerificationOtpUseCase,
			getUserByEmailUseCase,
		},
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { email, otp } = req.body;
		console.log("email ",email,"otp ",otp);
		let parsedOtp;
		if(typeof otp == "string"){
			parsedOtp = parseInt(otp)
		}else{
			// no change
			parsedOtp = otp
		}
		


		const user = await getUserByEmailUseCase(dependencies).execute(email);
		if (!user) {
			throw new BadRequestError("Invalid email");
		}
        console.log(user,"fetched user");
		
		const checkOtp = await checkEmailVerificationOtpUseCase(
			dependencies
		).execute({ otp: parsedOtp, email });
		
		if(!checkOtp){

			return res.status(403).json({
				message: "invalid otp"
			});
		}

	

        console.log("email verified");
        
		// const user = await getUserByEmailUseCase(dependencies).execute(checkToken.email);


		res.status(201).json({
			message: "user is registered successfully",
			data: user,
		});
	};
};
