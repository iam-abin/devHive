import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        useCases: { getCandidateProfileByuserIdUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        // const { userId } = req.params;
        const { userId } = req.currentUser;

        const candidate = await getCandidateProfileByuserIdUseCase(
            dependencies
        ).execute(userId);

        res.status(200).json({ message: "candidate profile fetched successfully", data: candidate });
    };
};
