import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllJobFieldsDistinctValuesUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const jobFields = await getAllJobFieldsDistinctValuesUseCase(dependencies).execute(req.body);
        res.status(200).json({ message: 'Jobs list', data: jobFields });
    };
};
