import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getUnreadMessagesCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const { senderId } = req.params;
        const {receiverId} = req.params;
        console.log("in getUnreadMessagesCount controller senderId 1: ", senderId );
        console.log("in getUnreadMessagesCount controller receiverId 1: ", receiverId );

        const response = await getUnreadMessagesCountUseCase(dependencies).execute(receiverId, senderId );
        console.log("in  get response controller 2: ", senderId, receiverId );


        res.status(200).json({message: "response is ", data: response })
    };

}