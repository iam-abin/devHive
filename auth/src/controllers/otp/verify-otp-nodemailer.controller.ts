import { Request, Response } from "express";

import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IOtp } from "../../frameworks/types/otpInterface";

export = (dependencies: IDependency) => {
    const {
        useCases: { verifyEmailOtpUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { email, otp } = req.body as IOtp;

        const user = await verifyEmailOtpUseCase(dependencies).execute({ email, otp });

        return res
            .status(200)
            .json({ message: `Otp Verified successfully`, data: user });
    };
};
