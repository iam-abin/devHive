import { Request, Response } from "express";

import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IOtp } from "../../frameworks/types/otpInterface";

export = (dependencies: IDependency) => {
	const {
		useCases: { checkEmailVerificationOtpUseCase, getUserByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {

		const {
            user,
            accessToken,
            refreshToken,
        } =
            await checkEmailVerificationOtpUseCase(dependencies).execute(
                req.body as IOtp
            );

        res.status(201).json({
            message: "user is registered successfully",
            data: user,
            recruiterAccessToken: accessToken,
			recruiterRefreshToken: refreshToken,
        });
	};
};
