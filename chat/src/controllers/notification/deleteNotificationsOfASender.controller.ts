import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { deleteAllNotificationsBySenderIdUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId: receiverId } = req.currentUser!;
        const { senderId } = req.params;

        const response = await deleteAllNotificationsBySenderIdUseCase(dependencies).execute(
            receiverId,
            senderId,
        );

        res.status(200).json({ message: 'response is ', data: response });
    };
};
