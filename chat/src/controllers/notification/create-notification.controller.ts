import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { createNotificationUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const { notificationData } = req.body;
        const notification = await createNotificationUseCase(dependencies).execute(notificationData);

        res.status(201).json({message: "Notifications are ", data: notification })
    };

}