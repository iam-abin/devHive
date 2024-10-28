import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';
import { IResume } from '../../frameworks/types/candidate';

export = (dependencies: IDependency) => {
    const {
        useCases: { uploadResumeUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser;

        const candidate = await uploadResumeUseCase(dependencies).execute(userId, req.body as IResume);

        res.status(201).json({ message: 'resume uploaded', data: candidate });
    };
};
