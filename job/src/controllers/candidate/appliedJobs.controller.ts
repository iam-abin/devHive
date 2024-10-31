import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllAppliedJobsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;

        const { appliedJobs, numberOfPages } = await getAllAppliedJobsUseCase(dependencies).execute(
            userId,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 2,
        );

        res.status(200).json({
            message: 'Applied Jobs are',
            data: { appliedJobs, numberOfPages },
        });
    };
};
