import { Request, Response } from 'express';

import { IDependency } from '../../frameworks/types/dependency';
import { ISignin } from '../../frameworks/types/user';

export = (dependencies: IDependency) => {
    const {
        useCases: { signInUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { email, password, role } = req.body as ISignin;

        const { user, accessToken, refreshToken } = await signInUseCase(dependencies).execute(
            email,
            password,
            role,
        );

        res.status(200).json({
            message: 'Login successful',
            data: { user, accessToken, refreshToken },
        });
    };
};
