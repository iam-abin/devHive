import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { searchCandidatesUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { searchKey } = req.query;

        const { candidates, numberOfPages } = await searchCandidatesUseCase(dependencies).execute(
            searchKey,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({
            message: 'candidates fetched successfully',
            data: { candidates, numberOfPages },
        });
    };
};
