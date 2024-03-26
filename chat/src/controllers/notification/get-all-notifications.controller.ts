import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllNotificationsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        const notification = await getAllNotificationsUseCase(dependencies).execute(userId);

        res.status(200).json({message: "Notifications are ", data: notification })
    };

}