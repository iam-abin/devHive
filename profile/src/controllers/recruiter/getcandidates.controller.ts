import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllCandidatesProfilesUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser;
        const { candidates, totalNumberOfPages } = await getAllCandidatesProfilesUseCase(
            dependencies,
        ).execute(Number(req.params.page) || 1, Number(req.params.limit) || 2, userId);

        res.status(200).json({
            message: 'candidates data fetched successfully',
            data: { candidates, totalNumberOfPages },
        });
    };
};
