import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { deleteAllNotificationsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const { userId } = req.params;

        const response = await deleteAllNotificationsUseCase(dependencies).execute( userId );

        res.status(200).json({message: "response is ", data: response })
    };

}