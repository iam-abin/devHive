import { IJwtPayload } from '@abijobportal/common';
import jwt from 'jsonwebtoken';
import { AUTH_CONSTANTS } from './constants';
import { appConfig } from '../../config/appConfig';

export const createJwtAccessToken = (payload: IJwtPayload) => {
    const createdJwtToken = jwt.sign(payload, appConfig.JWT_SECRET_KEY, {
        expiresIn: AUTH_CONSTANTS.JWT_ACCESS_TOKEN_EXPIRY,
    });

    return createdJwtToken;
};

export const createJwtRefreshToken = (payload: IJwtPayload) => {
    const createdJwtToken = jwt.sign(payload, appConfig.JWT_REFRESH_SECRET_KEY, {
        expiresIn: AUTH_CONSTANTS.JWT_REFRESH_TOKEN_EXPIRY,
    });

    return createdJwtToken;
};

export const verifyRefreshJwtToken = (token: string): IJwtPayload => {
    if (!appConfig.JWT_REFRESH_SECRET_KEY) throw new Error('please provide JWT SECRET KEY');

    const decodedData = jwt.verify(token, appConfig.JWT_REFRESH_SECRET_KEY) as IJwtPayload;
    return decodedData;
};
