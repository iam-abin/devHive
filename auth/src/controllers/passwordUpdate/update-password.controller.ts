import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { updatePasswordUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const {id, password} = req.body;
        
        const user = await updatePasswordUseCase(dependencies).execute({
            id, password
        });

        res.status(200).json({message: "password updated", data: user})
    };

}