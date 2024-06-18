import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getChatRoomsUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {userId} = req.params
        const chatRooms = await getChatRoomsUseCase(dependencies).execute(userId);

        res.status(200).json({message: "Chat rooms are ", data: chatRooms })
    };

}