import { connectDB } from "./config/db";
import { app } from "./app";
import { kafkaClient } from "./config/kafka-connection";
import { jobUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/job-updated-consumer";

const start = async () => {
	console.log("Job Starting up....");

	// if we do not set JWT_SECRET_KEY
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT_SECRET_KEY must be defined");
	}

	// if we do not set mongo_uri
	if (!process.env.MONGO_URL_JOB) {
		throw new Error("MONGO_URL_JOB must be defined");
	}

	// to connect to mongodb
	await connectDB()

	// it is used to listen to incomming message from kafka topics
	const jobUpdatedEvent = new jobUpdatedEventConsumer(kafkaClient);
	await jobUpdatedEvent.subscribe()

	app.listen(3000, () => {
		console.log("job Listening on port 3000....");
	})
	.on("error", async () => {
		await jobUpdatedEvent.disconnect();
	})
	.on("close", async () => {
		await jobUpdatedEvent.disconnect();
	});
};

start();
