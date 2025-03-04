export interface IAppConfig {
    PORT: string | number;
    API_PREFIX: string;
    MONGO_URL_AUTH: string;
    ENVIRONMENT: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_SERVICE_SID: string;
}

const appConfig: Readonly<IAppConfig> = Object.freeze({
    PORT: (process.env.PORT as string) || 3000,
    API_PREFIX: (process.env.API_PREFIX as string) || '/api/v1/auth',
    MONGO_URL_AUTH: process.env.MONGO_URL_AUTH as string,
    ENVIRONMENT: process.env.NODE_ENV as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY as string,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN as string,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID as string,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID as string,
});

export { appConfig };
