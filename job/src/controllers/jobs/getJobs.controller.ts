import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        useCases: {
            getAllJobsUseCase,
        },
    } = dependencies;

    return async (req: Request, res: Response) => {
        let candidateId: string | undefined = req.currentUser?.userId;

        const { jobs, numberOfPages } = await getAllJobsUseCase(dependencies).execute(
            Number(req.params.page) || 1,
            Number(req.params.limit) || 2
        ); 
		

        res.status(200).json({
            message: "Jobs list fetched successfully",
            data: { jobs, totalNumberOfPages: numberOfPages },
        });
    };
};
