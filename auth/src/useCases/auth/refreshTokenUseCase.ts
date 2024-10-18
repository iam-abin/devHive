import {  IJwtPayload, NotAuthorizedError, NotFoundError, verifyJwtToken } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependency";
import {
    createJwtAccessToken,
} from "../../frameworks/utils/jwtToken";

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository)
        throw new Error("usersRepository should exist in dependencies");

    const execute = async(barerToken: string) => {

    
    if (barerToken) throw new NotAuthorizedError();

        let refreshToken: string = "";
        if (barerToken.startsWith("Bearer ")) {
            refreshToken = barerToken.substring("Bearer ".length);
        }

        const jwtPayload: IJwtPayload = verifyJwtToken(refreshToken);

        let user = await usersRepository.getByEmail(jwtPayload.email)

        if (!user) throw new NotFoundError("User not found");

        const accessToken = createJwtAccessToken(jwtPayload);
        return { accessToken, refreshToken, user }
    }
    return {execute };
};
