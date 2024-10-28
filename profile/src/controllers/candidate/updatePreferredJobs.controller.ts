import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { updatePreferredJobsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { preferredJobs } = req.body;
        const { userId } = req.currentUser;

        const candidate = await updatePreferredJobsUseCase(dependencies).execute(userId, preferredJobs);

        res.status(201).json({ message: 'skills updated', data: candidate });
    };
};
