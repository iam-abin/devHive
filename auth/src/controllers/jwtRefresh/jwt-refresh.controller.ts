import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import {
    IJwtPayload,
    NotAuthorizedError,
    NotFoundError,
    verifyJwtToken,
} from "@abijobportal/common";
import { createJwtAccessToken } from "../../frameworks/utils/jwtToken";

export = (dependencies: IDependency) => {
    const {
        useCases: { refreshTokenUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        let { accessToken, refreshToken, user } = await refreshTokenUseCase(
            dependencies
        ).execute(req.headers.authorization as string);

        return res.status(200).json({
            message: "access token created",
            data: user,
            accessToken,
            refreshToken,
        });
    };
};
