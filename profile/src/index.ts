import { connectDB } from './config/db.connection';
import { app } from './frameworks/express/app';
import { UserCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-created-consumer';
import { UserUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-updated-consumer';
import { kafkaClient } from './config/kafka.connection';
import { paymentCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/payment-created-consumer';
import { appConfig, IAppConfig } from './config/appConfig';

const start = async () => {
    console.log('Starting up profile....');

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
    const paymentCreatedEvent = new paymentCreatedEventConsumer(kafkaClient);

    await userCreatedEvent.subscribe();
    await userUpdatedEvent.subscribe();
    await paymentCreatedEvent.subscribe();

    app.listen(appConfig.PORT, () => {
        console.log(`profile Listening on port ${appConfig.PORT}....`);
    })
        .on('error', async () => {
            await userCreatedEvent.disconnect();
            await userUpdatedEvent.disconnect();
            await paymentCreatedEvent.disconnect();
        })
        .on('close', async () => {
            await userCreatedEvent.disconnect();
            await userUpdatedEvent.disconnect();
            await paymentCreatedEvent.disconnect();
        });
};

start();
