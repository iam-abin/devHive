import { Request, Response } from "express";
import { ROLES } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const {
		useCases: { signInUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await signInUseCase(
            dependencies
        ).execute(email, password, ROLES.RECRUITER);

        res.status(200).json({
            message: "Login successful",
            data: user,
            recruiterAccessToken:accessToken,
            recruiterRefreshToken: refreshToken,
        });
	};
};
