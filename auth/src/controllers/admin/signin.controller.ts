import { Request, Response } from "express";
import { BadRequestError, ROLES } from "@abijobportal/common";

import {
    createJwtAccessToken,
    createJwtRefreshToken,
} from "../../frameworks/utils/jwtToken";

import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
    const {
        useCases: { getUserByEmailUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // check admin exist
        const isExistingUser = await getUserByEmailUseCase(
            dependencies
        ).execute(email);

        if (!isExistingUser)
            throw new BadRequestError("Invalid email or password");

        if (isExistingUser.role !== ROLES.ADMIN)
            throw new BadRequestError("Invalid Admin");

        // check password is correct
        const isSamePassword = password === isExistingUser.password;

        if (!isSamePassword)
            throw new BadRequestError("Invalid email or passwordd");

        // Generate Jwt
        const adminPayloadData = {
            userId: isExistingUser.id,
            email: isExistingUser.email,
            role: isExistingUser.role,
        };

        // Generate a Jwt access token
        const adminAccessToken = createJwtAccessToken(adminPayloadData);
        const adminRefreshToken = createJwtRefreshToken(adminPayloadData);

        res.status(200).json({
            message: "Login successfull",
            data: isExistingUser,
            adminAccessToken,
            adminRefreshToken,
        });
    };
};
