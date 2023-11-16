import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const candidate = await getCandidateByIdUseCase(dependencies).execute({
            id
        });

        res.status(200).json({message: "candidate data", data: candidate })
    };

}