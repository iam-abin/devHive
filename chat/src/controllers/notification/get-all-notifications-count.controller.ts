import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllNotificationsCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params
        console.log("in  getAllNotifications count controller 1: ",userId);

        const notification = await getAllNotificationsCountUseCase(dependencies).execute(userId);
        
        console.log("in  getAllNotifications count controller 2: ",notification);


        res.status(200).json({message: "Notifications count are ", data: notification })
    };

}