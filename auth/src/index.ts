import { connectDB } from './config/db.connection';
import { app } from './frameworks/express/app';
import { UserUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-updated-consumer';
import { kafkaClient } from './config/kafka.connection';
import { appConfig, IAppConfig } from './config/appConfig';

const start = async () => {
    console.log('Starting up....');

    // Env checking
    const REQUIRED_ENV_VARIABLES = (Object.keys(appConfig) as (keyof IAppConfig)[])

    const missingEnvVariables: string[] = REQUIRED_ENV_VARIABLES.filter((key: keyof IAppConfig) => {
        const value: string | number | string[] = appConfig[key];
        return !value || (Array.isArray(value) && !value.length);
    });

    if (missingEnvVariables.length) {
        // eslint-disable-next-line no-console
        console.error(
            `🚨 Missing the following required environment variable${missingEnvVariables.length === 1 ? '' : 's'}: ` +
            `${missingEnvVariables.map((variable) => `"${variable}"`).join(', ')} `,
        );
        process.exit(1);
    }

    // to connect to mongodb
    await connectDB();

    // it is used to listen to incomming message from kafka topics
    const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);

    await userUpdatedEvent.subscribe();

    app.listen(appConfig.PORT, () => {
        console.log(`auth Listening on port ${appConfig.PORT}....`);
    })
        .on('error', async () => {
            await userUpdatedEvent.disconnect();
        })
        .on('close', async () => {
            await userUpdatedEvent.disconnect();
        });
};

start();
