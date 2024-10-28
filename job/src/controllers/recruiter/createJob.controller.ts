import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';
import { IJob } from '../../frameworks/types/job';

export = (dependencies: IDependency) => {
    const {
        useCases: { createJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;
        const newJob = await createJobUseCase(dependencies).execute(userId, req.body as IJob);
        res.status(201).json({ message: 'Job created successfully', data: newJob });
    };
};
