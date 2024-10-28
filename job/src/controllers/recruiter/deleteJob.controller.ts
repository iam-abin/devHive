import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { deleteJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { id: jobId } = req.params;
        const { userId } = req.currentUser!;

        const remainingJobs = await deleteJobUseCase(dependencies).execute(jobId, userId);

        return res.status(200).json({ message: 'Job deleted successfully', data: remainingJobs });
    };
};
