import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllRecruitersUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { recruiters, numberOfPages } = await getAllRecruitersUseCase(dependencies).execute(
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({ message: 'all recruiters', data: { recruiters, numberOfPages } });
    };
};
