import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllCandidatesUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { candidates, numberOfPages } = await getAllCandidatesUseCase(dependencies).execute(
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({
            message: 'candidates fetched successfully',
            data: { candidates, numberOfPages },
        });
    };
};
