import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllNotificationsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        const notification = await getAllNotificationsUseCase(dependencies).execute(userId);

        res.status(200).json({message: "Notifications are ", data: notification })
    };

}