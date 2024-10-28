import { Request, Response } from 'express';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { sendOtpEmailUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { email } = req.body;

        await sendOtpEmailUseCase(dependencies).execute({ email });
        res.status(200).json({
            message: `An email is send to ${email}, please verify.`,
        });
    };
};
