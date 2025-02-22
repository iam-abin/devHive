import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllDashboardCardsDetailsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const dashboardCardsDetails = await getAllDashboardCardsDetailsUseCase(dependencies).execute();

        res.status(200).json({
            message: 'dashboard card details fetched successfully',
            data: dashboardCardsDetails,
        });
    };
};
