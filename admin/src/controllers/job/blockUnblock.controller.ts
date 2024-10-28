import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { blockUnblockJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { jobId } = req.params;

        const isBlocked = await blockUnblockJobUseCase(dependencies).execute(jobId);
        res.status(200).json({
            message: `job ${isBlocked.isActive ? 'unBlocked' : 'Blocked'}  successfully`,
            data: isBlocked,
        });
    };
};
