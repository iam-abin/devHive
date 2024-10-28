import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { recruiterDashboardCardsDetailsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;
        const dashboardCardsDetails =
            await recruiterDashboardCardsDetailsUseCase(dependencies).execute(userId);
        res.status(200).json({
            message: 'dashboard card details fetched successfully',
            data: dashboardCardsDetails,
        });
    };
};
