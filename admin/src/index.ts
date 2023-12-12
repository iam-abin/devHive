import { connectDB } from "./config/db";
import { app } from "./app";
import { CompanyProfileCreatedEventConsumer } from "./frameworks/services/kafka-events/consumers/company-profile-created-consumer";
import { CompanyProfileUpdatedEventConsumer } from "./frameworks/services/kafka-events/consumers/company-profile-updated-consumer";
import { JobCreatedEventConsumer } from "./frameworks/services/kafka-events/consumers/job-created-consumer";
import { JobUpdatedEventConsumer } from "./frameworks/services/kafka-events/consumers/job-updated-consumer";
import { UserCreatedEventConsumer } from "./frameworks/services/kafka-events/consumers/user-created-consumer";
import { UserUpdatedEventConsumer } from "./frameworks/services/kafka-events/consumers/user-updated-consumer";

import { kafkaClient } from "./config/kafka-connection";

const start = async () => {
	console.log("Starting up....");

	//if we do not set JWT_SECRET_KEY
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT_SECRET_KEY must be defined");
	}

	//if we do not set mongo_uri
	if (!process.env.MONGO_URL_ADMIN) {
		throw new Error("MONGO_URL_ADMIN must be defined");
	}

	// to connect to mongodb
	await connectDB();

	// it is used to listen to incomming message from kafka topics
	const companyProfileCreatedEvent = new CompanyProfileCreatedEventConsumer(
		kafkaClient
	);
	const companyProfileUpdatedEvent = new CompanyProfileUpdatedEventConsumer(
		kafkaClient
	);
	const jobCreatedEvent = new JobCreatedEventConsumer(kafkaClient);
	const jobUpdatedEvent = new JobUpdatedEventConsumer(kafkaClient);
	const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
	const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);

	await companyProfileCreatedEvent.subscribe();
	await companyProfileUpdatedEvent.subscribe();
	await jobCreatedEvent.subscribe();
	await jobUpdatedEvent.subscribe();
	await userUpdatedEvent.subscribe();
	await userCreatedEvent.subscribe();

	app.listen(3000, () => {
		console.log("admin Listening on port 3000....");
	})
		.on("error", async () => {
			await companyProfileCreatedEvent.disconnect();
			await companyProfileUpdatedEvent.disconnect();
			await jobCreatedEvent.disconnect();
			await jobUpdatedEvent.disconnect();
			await userUpdatedEvent.disconnect();
			await userCreatedEvent.disconnect();
		})
		.on("close", async () => {
			await companyProfileCreatedEvent.disconnect();
			await companyProfileUpdatedEvent.disconnect();
			await jobCreatedEvent.disconnect();
			await jobUpdatedEvent.disconnect();
			await userUpdatedEvent.disconnect();
			await userCreatedEvent.disconnect();
		});
};

start();
