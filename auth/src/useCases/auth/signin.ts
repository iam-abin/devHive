import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { comparePassword } from '../../frameworks/utils/password';
import { createJwtAccessToken, createJwtRefreshToken } from '../../frameworks/utils/jwtToken';

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) throw new Error('usersRepository should exist in dependencies');

    const execute = async (email: string, password: string, requiredRole: string) => {
        const existingUser = await usersRepository.getByEmail(email);

        if (!existingUser) {
            throw new BadRequestError('Invalid email or password');
        }

        // check password is correct
        const isSamePassword = await comparePassword(password, existingUser.password);

        if (!isSamePassword) {
            throw new BadRequestError('Invalid email or passwordd');
        }

        if (existingUser.role !== requiredRole) {
            throw new BadRequestError(`Invalid ${requiredRole}`);
        }

        if (!existingUser.isActive) {
            throw new BadRequestError('This is a blocked user');
        }

        // Generate Jwt
        const jwtPayload = {
            userId: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
        };

        // Generate Jwt key
        const accessToken = createJwtAccessToken(jwtPayload);
        const refreshToken = createJwtRefreshToken(jwtPayload);

        return {
            user: existingUser,
            accessToken,
            refreshToken,
        };
    };

    return { execute };
};
