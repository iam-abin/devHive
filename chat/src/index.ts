import { appConfig } from './config/appConfig';
import { connectDB } from './config/db.connection';
import { kafkaClient } from './config/kafka.connection';
import { httpServer } from './frameworks/express/app';
import { CandidateProfileUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/candidate-profile-updated-consumer';
import { UserCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-created-consumer';
import { UserUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-updated-consumer';
import { setupSocketIO } from './frameworks/webSocket/socket';

const start = async () => {
    console.log('chat service Starting up....');

    if (!appConfig.MONGO_URL_CHAT) throw new Error('MONGO_URL_CHAT must be defined');
    if (!appConfig.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY must be defined');
    if (!appConfig.JWT_REFRESH_SECRET_KEY) throw new Error('JWT_REFRESH_SECRET_KEY must be defined');

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
