import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getRecruiterCreatedJobsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;
        const { jobs, numberOfPages } = await getRecruiterCreatedJobsUseCase(dependencies).execute(
            userId,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(201).json({
            message: 'Jobs got successfully',
            data: { jobs, numberOfPages },
        });
    };
};
