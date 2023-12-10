import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updatePasswordUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        // console.log(req,"req--//////////////////////////////");
        console.log("password Update");
        
        const {id, password} = req.body;
        

        const user = await updatePasswordUseCase(dependencies).execute({
            id, password
        });

        res.status(200).json({message: "password updated", data: user})
    };

}