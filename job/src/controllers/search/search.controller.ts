import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { searchUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { type: resourceType } = req.params;
        const { searchKey } = req.query;
        
        const { jobs, numberOfPages } = await searchUseCase(dependencies).execute(
            resourceType,
            searchKey as string,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({
            message: 'search results fetched successfully ',
            data: { jobs, numberOfPages },
        });
    };
};
