import { connectDB } from './config/db.connection';
import { app } from './frameworks/express/app';
import { kafkaClient } from './config/kafka.connection';
import { MembershipPlanCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/premiumPlanCreatedConsumer';
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


    const membershipPlanCreatedEvent = new MembershipPlanCreatedEventConsumer(kafkaClient);

    await membershipPlanCreatedEvent.subscribe();

    // to connect to mongodb
    await connectDB();

    app.listen(appConfig.PORT, () => {
        console.log(`payment Listening on port ${appConfig.PORT}....`);
    })
        .on('error', async () => {
            await membershipPlanCreatedEvent.disconnect();
        })
        .on('close', async () => {
            await membershipPlanCreatedEvent.disconnect();
        });
};

start();
