import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { deleteAllNotificationsBySenderIdUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const { senderId } = req.params;
        const {receiverId} = req.params;

        const response = await deleteAllNotificationsBySenderIdUseCase(dependencies).execute( senderId, receiverId );
        
        res.status(200).json({message: "response is ", data: response })
    };

}