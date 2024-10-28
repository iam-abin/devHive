import { Request, Response } from 'express';

import { IDependency } from '../../frameworks/types/dependency';
import { IMobileOtp } from '../../frameworks/types/otp';

export = (dependencies: IDependency) => {
    const {
        useCases: { verifyMobileOtpUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { phone, otp, email } = req.body as IMobileOtp;

        const user = await verifyMobileOtpUseCase(dependencies).execute({ email, phone, otp });

        return res.status(200).json({ message: `Otp Verified successfully`, data: user });
    };
};
