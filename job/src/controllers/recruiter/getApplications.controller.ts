import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllJobApplicationsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId: recruiterId } = req.currentUser!;

        const { applications, numberOfPages } = await getAllJobApplicationsUseCase(dependencies).execute(
            recruiterId,
            null,
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );

        res.status(200).json({
            message: 'Job applications are ',
            data: { applications, numberOfPages },
        });
    };
};
