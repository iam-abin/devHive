import { Request, Response } from "express";
export = (dependencies: any)=>{

    const { useCases: { updateCandidatePasswordUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id, password} = req.body;
        

        const user = await updateCandidatePasswordUseCase(dependencies).execute({
            id, password
        });

        res.status(200).json({message: "password updated", data: user})
    };

}