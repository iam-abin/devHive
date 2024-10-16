import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency)=>{

    const { useCases: { getAJobApplicationUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        const {jobApplicationId} = req.params;
        const { userId } = req.currentUser
        const application = await getAJobApplicationUseCase(dependencies).execute(jobApplicationId, userId);
        res.status(200).json({message: "Job applications are ", data: application })
    };

}