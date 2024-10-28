import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { filterJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const filterData = req.body;

        const { jobs, numberOfPages } = await filterJobUseCase(dependencies).execute(
            filterData,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 2,
        );

        res.status(200).json({
            message: 'Job filtered successfully',
            data: { jobs, numberOfPages },
        });
    };
};
