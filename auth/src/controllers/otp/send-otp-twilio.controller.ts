import { Request, Response } from "express";

import { IDependency } from "../../frameworks/types/dependency";
import { IMobileOtp } from "../../frameworks/types/otp";

export = (dependencies: IDependency) => {
    const {
        useCases: { sendOtpMobileUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        let { email, phone } = req.body as Omit<IMobileOtp, "otp">;

        if (typeof phone === "string") phone = parseInt(phone);

        const isExistingUser = await sendOtpMobileUseCase(dependencies).execute(
            { email, phone }
        );

        res.status(200).json({
            message: `Otp send to ${phone}`,
            data: isExistingUser,
        });
    };
};
