import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        useCases: { applyJobUseCase, getAnAppliedJobUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!; // candidateId
        const { jobId } = req.params;

        const applied = await applyJobUseCase(dependencies).execute(
            userId,
            jobId
        );

        res.status(200).json({
            message: "Job applied successfully",
            data: applied,
        });
    };
};
