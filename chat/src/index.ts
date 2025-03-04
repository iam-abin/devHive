import { appConfig, IAppConfig } from './config/appConfig';
import { connectDB } from './config/db.connection';
import { kafkaClient } from './config/kafka.connection';
import { httpServer } from './frameworks/express/app';
import { CandidateProfileUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/candidate-profile-updated-consumer';
import { UserCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-created-consumer';
import { UserUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-updated-consumer';
import { setupSocketIO } from './frameworks/webSocket/socket';

const start = async () => {
    console.log('chat service Starting up....');

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

    console.log('before socket instance');
    setupSocketIO(httpServer);
    console.log('after socket instance');

    await connectDB();

    const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);

    const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);

    const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventConsumer(kafkaClient);

    await userUpdatedEvent.subscribe();
    await userCreatedEvent.subscribe();
    await candidateProfileUpdatedEvent.subscribe();

    httpServer
        .listen(appConfig.PORT, () => {
            console.log(`chat service Listening on port ${appConfig.PORT}....`);
        })
        .on('error', async () => {
            await userUpdatedEvent.disconnect();
            await userCreatedEvent.disconnect();
            await candidateProfileUpdatedEvent.disconnect();
        })
        .on('close', async () => {
            await userUpdatedEvent.disconnect();
            await userCreatedEvent.disconnect();
            await candidateProfileUpdatedEvent.disconnect();
        });
};

start();
