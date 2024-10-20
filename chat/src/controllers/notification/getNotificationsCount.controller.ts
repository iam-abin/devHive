import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAllNotificationsCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser!;
        const notification = await getAllNotificationsCountUseCase(dependencies).execute(userId);
console.log(notification,"notification count");

        res.status(200).json({message: "Notifications count are ", data: notification })
    };

}