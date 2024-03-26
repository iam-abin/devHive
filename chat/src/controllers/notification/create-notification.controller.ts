import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createNotificationUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const { notificationData } = req.body;
        const notification = await createNotificationUseCase(dependencies).execute(notificationData);

        res.status(201).json({message: "Notifications are ", data: notification })
    };

}