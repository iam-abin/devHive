import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllNotificationsCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        const notification = await getAllNotificationsCountUseCase(dependencies).execute(userId);

        res.status(200).json({message: "Notifications count are ", data: notification })
    };

}