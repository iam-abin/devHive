import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getSearchResultUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        
        const { searchKey } = req.body;

        const { jobs, numberOfPages } = await getSearchResultUseCase(dependencies).execute(
            searchKey,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 2,
        );

        res.status(200).json({
            message: 'search results fetched successfully ',
            data: { jobs, numberOfPages },
        });
    };
};
