import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getConversationUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {chatRoomId} = req.params;
        const conversation = await getConversationUseCase(dependencies).execute(chatRoomId);
        
        res.status(200).json({message: "Conversations are ", data: conversation })
    };

}