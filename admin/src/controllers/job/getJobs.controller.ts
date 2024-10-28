import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllJobsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { jobs, numberOfPages } = await getAllJobsUseCase(dependencies).execute(
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({ message: 'all jobs', data: { jobs, numberOfPages } });
    };
};
