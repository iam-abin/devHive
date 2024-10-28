import { connectDB } from './config/db.connection';
import { app } from './frameworks/express/app';
import { UserCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-created-consumer';
import { UserUpdatedEventConsumer } from './frameworks/utils/kafka-events/consumers/user-updated-consumer';
import { kafkaClient } from './config/kafka.connection';
import { paymentCreatedEventConsumer } from './frameworks/utils/kafka-events/consumers/payment-created-consumer';
import { appConfig } from './config/appConfig';

const start = async () => {
    console.log('Starting up profile....');

    if (!appConfig.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY must be defined');

    if (!appConfig.JWT_REFRESH_SECRET_KEY) throw new Error('JWT_REFRESH_SECRET_KEY must be defined');

    if (!appConfig.MONGO_URL_PROFILE) throw new Error('MONGO_URL_PROFILE must be defined');

    if (!appConfig.CLOUDINARY_API_KEY) throw new Error('CLOUDINARY_API_KEY must be defined');

    if (!appConfig.CLOUDINARY_API_SECRET) throw new Error('CLOUDINARY_API_SECRET must be defined');

    if (!appConfig.CLOUDINARY_CLOUD_NAME) throw new Error('CLOUDINARY_CLOUD_NAME must be defined');

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
