import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getUsersUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const keyword = req.query.search;
        const applications = await getUsersUseCase(dependencies).execute(keyword);

        res.status(200).json({message: "Job applications are ", data: applications })
    };

}