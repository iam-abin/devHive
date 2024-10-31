import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { searchRecruitersUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { searchKey } = req.query;
        const { recruiters, numberOfPages } = await searchRecruitersUseCase(dependencies).execute(
            searchKey,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({ message: 'all recruiters', data: { recruiters, numberOfPages } });
    };
};
