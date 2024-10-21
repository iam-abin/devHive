import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        useCases: { getChatRoomsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser;
        const chatRooms = await getChatRoomsUseCase(dependencies).execute(
            userId
        );

        res.status(200).json({ message: "Chat rooms are ", data: chatRooms });
    };
};
