import { connectDB } from "./config/db.connection";
import { app } from "./frameworks/express/app";
import { kafkaClient } from "./config/kafka.connection";
import { jobUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-updated-consumer";
import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
import { appConfig } from "./config/appConfig";

const start = async () => {
	console.log("Job service Starting up....");

	if (appConfig.JWT_SECRET_KEY) 
		throw new Error("JWT_SECRET_KEY must be defined");

	if (appConfig.JWT_REFRESH_SECRET_KEY) 
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");

	if (appConfig.MONGO_URL_JOB) 
		throw new Error("MONGO_URL_JOB must be defined");

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
	.on("error", async () => {
		await jobUpdatedEvent.disconnect();
		await userCreatedEvent.disconnect();
		await userUpdatedEvent.disconnect();
	})
	.on("close", async () => {
		await jobUpdatedEvent.disconnect();
		await userCreatedEvent.disconnect();
		await userUpdatedEvent.disconnect();
	});
};

start();
