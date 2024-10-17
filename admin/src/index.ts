import { connectDB } from "./config/db.connection";
import { app } from "./frameworks/express/app";
import { kafkaClient } from "./config/kafka.connection";
import { JobCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-created-consumer";
import { JobUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-updated-consumer";
import { JobDeletedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-deleted-consumer";
import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
import { CandidateProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/candidate-profile-updated-consumer";
import { RecruiterProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/recruiter-profile-updated-consumer";
import { PaymentcreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/payment-created-consumer";
import { appConfig } from "./config/appConfig";

const start = async () => {
    console.log("Starting up....");

    if (!appConfig.JWT_SECRET_KEY)
        throw new Error("JWT_SECRET_KEY must be defined");
    if (!appConfig.JWT_REFRESH_SECRET_KEY)
        throw new Error("JWT_REFRESH_SECRET_KEY must be defined");
    if (!appConfig.MONGO_URL_ADMIN)
        throw new Error("MONGO_URL_ADMIN must be defined");

    // to connect to mongodb
    await connectDB();

    const candidateProfileUpdatedEvent =
        new CandidateProfileUpdatedEventConsumer(kafkaClient);
    const recruiterProfileUpdatedEvent =
        new RecruiterProfileUpdatedEventConsumer(kafkaClient);

    const jobCreatedEvent = new JobCreatedEventConsumer(kafkaClient);
    const jobUpdatedEvent = new JobUpdatedEventConsumer(kafkaClient);
    const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
    const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);
    const jobDeletedEvent = new JobDeletedEventConsumer(kafkaClient);
    const paymentcreatedEvent = new PaymentcreatedEventConsumer(kafkaClient);
	
    await candidateProfileUpdatedEvent.subscribe();
    await recruiterProfileUpdatedEvent.subscribe();
    await jobCreatedEvent.subscribe();
    await jobUpdatedEvent.subscribe();
    await jobDeletedEvent.subscribe();
    await userUpdatedEvent.subscribe();
    await userCreatedEvent.subscribe();
    await paymentcreatedEvent.subscribe();

    app.listen(appConfig.PORT, () => {
        console.log(`admin Listening on port ${appConfig.PORT}....`);
    })

        .on("error", async () => {
            await candidateProfileUpdatedEvent.disconnect();
            await recruiterProfileUpdatedEvent.disconnect();
            await jobCreatedEvent.disconnect();
            await jobUpdatedEvent.disconnect();
            await jobDeletedEvent.disconnect();
            await userUpdatedEvent.disconnect();
            await userCreatedEvent.disconnect();
            await paymentcreatedEvent.disconnect();
        })
        .on("close", async () => {
            await candidateProfileUpdatedEvent.disconnect();
            await recruiterProfileUpdatedEvent.disconnect();
            await jobCreatedEvent.disconnect();
            await jobUpdatedEvent.disconnect();
            await jobDeletedEvent.disconnect();
            await userUpdatedEvent.disconnect();
            await userCreatedEvent.disconnect();
            await paymentcreatedEvent.disconnect();
        });
};

start();
