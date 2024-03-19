import { connectDB } from "./config/db";
import { app } from "./frameworks/express/app";
import { CompanyProfileCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/company-profile-created-consumer";
import { CompanyProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/company-profile-updated-consumer";
import { JobCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-created-consumer";
import { JobUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-updated-consumer";
import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";

import { kafkaClient } from "./config/kafka-connection";
import { JobDeletedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-deleted-consumer";
import { CandidateProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/candidate-profile-updated-consumer";
import { RecruiterProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/recruiter-profile-updated-consumer";
import { PaymentcreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/payment-created-consumer";


const start = async () => {
	console.log("Starting up....");

	//if we do not set JWT_SECRET_KEY
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT_SECRET_KEY must be defined");
	}

	// if we do not set JWT_REFRESH_SECRET_KEY
	if (!process.env.JWT_REFRESH_SECRET_KEY) {
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");
	}

	//if we do not set mongo_uri
	if (!process.env.MONGO_URL_ADMIN) {
		throw new Error("MONGO_URL_ADMIN must be defined");
	}
	
	// to connect to mongodb
	await connectDB();

	// it is used to listen to incomming message from kafka topics
	// const companyProfileCreatedEvent = new CompanyProfileCreatedEventConsumer(
	// 	kafkaClient
	// );
	// const companyProfileUpdatedEvent = new CompanyProfileUpdatedEventConsumer(
	// 	kafkaClient
	// );

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

	// await companyProfileCreatedEvent.subscribe();
	// await companyProfileUpdatedEvent.subscribe();
	
	await candidateProfileUpdatedEvent.subscribe();
	await recruiterProfileUpdatedEvent.subscribe();
	await jobCreatedEvent.subscribe();
	await jobUpdatedEvent.subscribe();
	await jobDeletedEvent.subscribe();
	await userUpdatedEvent.subscribe();
	await userCreatedEvent.subscribe();
	await paymentcreatedEvent.subscribe()
	
	app.listen(3000, () => {
		console.log("admin Listening on port 3000....");
	})
	
		.on("error", async () => {
			// await companyProfileCreatedEvent.disconnect();
			// await companyProfileUpdatedEvent.disconnect();

			await candidateProfileUpdatedEvent.disconnect();
			await recruiterProfileUpdatedEvent.disconnect();
			await jobCreatedEvent.disconnect();
			await jobUpdatedEvent.disconnect();
			await jobDeletedEvent.disconnect();
			await userUpdatedEvent.disconnect();
			await userCreatedEvent.disconnect();
			await paymentcreatedEvent.disconnect()
		})
		.on("close", async () => {
			// await companyProfileCreatedEvent.disconnect();
			// await companyProfileUpdatedEvent.disconnect();
			await candidateProfileUpdatedEvent.disconnect();
			await recruiterProfileUpdatedEvent.disconnect();
			await jobCreatedEvent.disconnect();
			await jobUpdatedEvent.disconnect();
			await jobDeletedEvent.disconnect();
			await userUpdatedEvent.disconnect();
			await userCreatedEvent.disconnect();
			await paymentcreatedEvent.disconnect()
		});

};

start();
