import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getRecruiterProfileByUserIdUseCase }} = dependencies
    

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        console.log("in recruiter view profile by candidate controller id: ",id);
        

        const recruiter = await getRecruiterProfileByUserIdUseCase(dependencies).execute(id);
        console.log("in recruiter view profile by candidate controller recruiter: ",recruiter);



        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}