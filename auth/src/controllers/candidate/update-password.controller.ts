import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updateCandidatePasswordUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        console.log(req,"//////////////////////////////");
        
        console.log(req.currentUserCandidate,"jdfjasidjfiashdfidyyyyyyyyyyyyyyyyyyyyyyyy");
        
        const {id, password} = req.body;
        

        const user = await updateCandidatePasswordUseCase(dependencies).execute({
            id, password
        });

        res.status(200).json({message: "password updated", data: user})
    };

}