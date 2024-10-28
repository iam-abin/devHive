import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllNotificationsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser;
        const notification = await getAllNotificationsUseCase(dependencies).execute(userId);

        res.status(200).json({ message: 'Notifications are ', data: notification });
    };
};
