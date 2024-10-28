import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { deleteAllNotificationsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;

        const response = await deleteAllNotificationsUseCase(dependencies).execute(userId);

        res.status(200).json({ message: 'response is ', data: response });
    };
};
