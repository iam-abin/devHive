import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getJobByIdUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { jobId } = req.params;
        const job = await getJobByIdUseCase(dependencies).execute(jobId);

        res.status(200).json({ message: 'job data', data: job });
    };
};
