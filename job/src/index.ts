import { connectDB } from './config/db.connection';
import { app } from './frameworks/express/app';
import { kafkaClient } from './config/kafka.connection';
import { jobUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/jobUpdatedConsumer';
import { UserCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/userCreatedConsumer';
import { UserUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/userUpdatedConsumer';
import { appConfig, IAppConfig } from './config/appConfig';

const start = async () => {
    console.log('Job service Starting up....');

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

    await connectDB();

    // it is used to listen to incomming message from kafka topics
    const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
    const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);
    const jobUpdatedEvent = new jobUpdatedEventConsumer(kafkaClient);

    await userUpdatedEvent.subscribe();
    await userCreatedEvent.subscribe();
    await jobUpdatedEvent.subscribe();

    app.listen(appConfig.PORT, () => {
        console.log(`job service Listening on port ${appConfig.PORT}....`);
    })
        .on('error', async () => {
            await jobUpdatedEvent.disconnect();
            await userCreatedEvent.disconnect();
            await userUpdatedEvent.disconnect();
        })
        .on('close', async () => {
            await jobUpdatedEvent.disconnect();
            await userCreatedEvent.disconnect();
            await userUpdatedEvent.disconnect();
        });
};

start();
