import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { deleteAllNotificationsBySenderIdUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const { userId } = req.currentUser;
        const {receiverId} = req.params;

        const response = await deleteAllNotificationsBySenderIdUseCase(dependencies).execute( userId, receiverId );
        
        res.status(200).json({message: "response is ", data: response })
    };

}