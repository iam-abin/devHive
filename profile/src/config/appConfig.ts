export interface IAppConfig {
    PORT: string | number;
    API_PREFIX: string;
    MONGO_URL_PROFILE: string;
    ENVIRONMENT: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
}

const appConfig: Readonly<IAppConfig> = Object.freeze({
    PORT: process.env.PORT || 3000,
    API_PREFIX: (process.env.API_PREFIX as string) || '/api/v1/profile',
    MONGO_URL_PROFILE: process.env.MONGO_URL_PROFILE as string,
    ENVIRONMENT: process.env.NODE_ENV as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
});

export { appConfig };
