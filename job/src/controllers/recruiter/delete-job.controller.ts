import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { deleteJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in recruiter delete job controller 1: ",id);

        const response = await deleteJobUseCase(dependencies).execute(id);
        console.log("in recruiter delete job controller 2: ",response);


        res.status(200).json({message: "Job deleted successfully", data: response })
    };

}