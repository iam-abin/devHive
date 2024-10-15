import { BadRequestError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { comparePassword } from "../../frameworks/utils/password";
import {
    createJwtAccessToken,
    createJwtRefreshToken,
} from "../../frameworks/utils/jwtToken";

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository)
        throw new Error("usersRepository should exist in dependencies");

    const execute = async (email: string, password: string, requiredRole: string) => {
        const isExistingUser = await usersRepository.getByEmail(email);

        if (!isExistingUser) {
            throw new BadRequestError("Invalid email or password");
        }

        // check password is correct
        const isSamePassword = await comparePassword(
            password,
            isExistingUser.password
        );

        if (!isSamePassword) {
            throw new BadRequestError("Invalid email or passwordd");
        }

        if (isExistingUser.role !== requiredRole) {
            throw new BadRequestError(`Invalid ${requiredRole}`);
        }

        if (!isExistingUser.isActive) {
            throw new BadRequestError("This is a blocked user");
        }

        // Generate Jwt
        const jwtPayload = {
            userId: isExistingUser.id,
            email: isExistingUser.email,
            role: isExistingUser.role,
        };

        // Generate Jwt key
        const accessToken = createJwtAccessToken(jwtPayload);
        const refreshToken = createJwtRefreshToken(jwtPayload);

        return {
            user: isExistingUser,
            accessToken,
            refreshToken,
        };
    };

    return { execute };
};
