interface IAppConfig {
    PORT: string | number;
    API_PREFIX: string;
    MONGO_URL_CHAT: string;
    ENVIRONMENT: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
}

const appConfig: Readonly<IAppConfig> = Object.freeze({
    PORT: (process.env.PORT as string) || 3000,
    API_PREFIX: (process.env.API_PREFIX as string) || '/api/v1/chat',
    MONGO_URL_CHAT: process.env.MONGO_URL_CHAT as string,
    ENVIRONMENT: process.env.NODE_ENV as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY as string,
});

export { appConfig };
