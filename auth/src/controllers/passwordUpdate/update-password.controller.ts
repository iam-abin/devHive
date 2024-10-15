import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IUpdatePassword } from "../../frameworks/types/userInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { updatePasswordUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const {userId, password} = req.body as IUpdatePassword;
        
        const user = await updatePasswordUseCase(dependencies).execute({
            userId, password
        });

        res.status(200).json({message: "password updated", data: user})
    };

}