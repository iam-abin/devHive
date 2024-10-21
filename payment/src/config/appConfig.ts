interface IAppConfig {
    PORT: string | number;
    API_PREFIX: string;
    MONGO_URL_PAYMENT: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;
    ENVIRONMENT: string;
    PAYMENT_SUCCESS_URL: string;
    PAYMENT_CANCEL_URL: string;
}

const appConfig: Readonly<IAppConfig> = Object.freeze({
    PORT: process.env.PORT as string || 3000,
    API_PREFIX: process.env.API_PREFIX as string || "/api/v1/payment",
    MONGO_URL_PAYMENT: process.env.MONGO_URL_PAYMENT as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY as string,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
    ENVIRONMENT: process.env.NODE_ENV as string,

    PAYMENT_SUCCESS_URL: `https://devhive.dev/candidate/payment-success`
        // process.env.NODE_ENV === "development"
            // ? 
            // `https://devhive.dev/candidate/payment-success`
            // : `https://abinvarghese.online/candidate/payment-success`
            ,
    PAYMENT_CANCEL_URL: `https://devhive.dev/candidate/payment-failed`
        // process.env.NODE_ENV === "development"
            // ? 
            // `https://devhive.dev/candidate/payment-failed`
            // : `https://abinvarghese.online/candidate/payment-failed`
});


export { appConfig };
