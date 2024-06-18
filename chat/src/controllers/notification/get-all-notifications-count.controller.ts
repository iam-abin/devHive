import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllNotificationsCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params;
        const notification = await getAllNotificationsCountUseCase(dependencies).execute(userId);

        res.status(200).json({message: "Notifications count are ", data: notification })
    };

}