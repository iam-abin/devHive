import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';
import { IJob } from '../../frameworks/types/job';

export = (dependencies: IDependency) => {
    const {
        useCases: { updateJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { jobId } = req.params;
        const { userId } = req.currentUser!;
        const updatedJob = await updateJobUseCase(dependencies).execute(
            jobId,
            userId,
            req.body as Partial<IJob>,
        );

        res.status(200).json({ message: 'Job updated successfully', data: updatedJob });
    };
};
