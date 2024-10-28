import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { checkIsAppliedJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!; // candidateId
        const { jobId } = req.params;

        const isApplied = await checkIsAppliedJobUseCase(dependencies).execute(userId, jobId);

        res.status(200).json({
            message: 'Job applied or not fetched successfully',
            data: { isApplied },
        });
    };
};
