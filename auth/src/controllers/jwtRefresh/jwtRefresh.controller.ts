import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";


export = (dependencies: IDependency) => {
    const {
        useCases: { refreshTokenUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const refreshData = await refreshTokenUseCase(
            dependencies
        ).execute(req.headers.authorization as string);

        return res.status(200).json({
            message: "access token created",
            data: refreshData,
        });
    };
};
