import { Request, Response } from 'express';

import { IDependency } from '../../frameworks/types/dependency';
import { IMobileOtp } from '../../frameworks/types/otp';

export = (dependencies: IDependency) => {
    const {
        useCases: { sendOtpMobileUseCase, sendOtpEmailUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        // eslint-disable-next-line prefer-const
        let { email, phone } = req.body as Omit<IMobileOtp, 'otp'>;
        if (phone) {
            await sendOtpMobileUseCase(dependencies).execute({ email, phone });
        } else {
            await sendOtpEmailUseCase(dependencies).execute({ email });
        }

        res.status(200).json({
            message: phone ? `Otp send to ${phone}` : `An email is send to ${email}, please verify.`,
        });
    };
};
