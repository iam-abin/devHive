import {
    IJwtPayload,
    NotAuthorizedError,
    NotFoundError,
} from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependency";
import {
    createJwtAccessToken,
    verifyRefreshJwtToken,
} from "../../frameworks/utils/jwtToken";

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository)
        throw new Error("usersRepository should exist in dependencies");

    const execute = async (barerToken: string) => {
        if (!barerToken) throw new NotAuthorizedError();

        let refreshToken: string = "";
        if (barerToken.startsWith("Bearer ")) {
            refreshToken = barerToken.substring("Bearer ".length);
        }

        try {
            const jwtPayload: IJwtPayload = verifyRefreshJwtToken(refreshToken);

            let user = await usersRepository.getByEmail(jwtPayload.email);

            if (!user) throw new NotFoundError("User not found");

            const accessToken = createJwtAccessToken({
                userId: user._id,
                email: user.email,
                role: user.role,
            });
            return { accessToken, refreshToken, user };
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Pass the error message string to NotAuthorizedError
                throw new NotAuthorizedError(error.message);
            } else {
                throw new NotAuthorizedError("Authorization error");
            }
        }
    };
    return { execute };
};
