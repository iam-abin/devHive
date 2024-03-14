import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllNotificationsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params
        console.log("in  getAllNotifications controller 1: ",userId);

        const notification = await getAllNotificationsUseCase(dependencies).execute(userId);
        console.log("in  getAllNotifications controller 2: ",notification);


        res.status(200).json({message: "Notifications are ", data: notification })
    };

}