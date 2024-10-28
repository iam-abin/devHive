import { Request, Response } from 'express';

import { IDependency } from '../../frameworks/types/dependency';
import { IMobileOtp } from '../../frameworks/types/otp';
import { verifyEmailOtpUseCase } from '../../useCases';

export = (dependencies: IDependency) => {
    const {
        useCases: { verifyMobileOtpUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { phone, otp, email } = req.body as IMobileOtp;

        let user;
        if (phone) {
            user = await verifyMobileOtpUseCase(dependencies).execute({ email, phone, otp });
        } else {
            user = await verifyEmailOtpUseCase(dependencies).execute({ email, otp });
        }

        return res.status(200).json({ message: `Otp Verified successfully`, data: user });
    };
};
