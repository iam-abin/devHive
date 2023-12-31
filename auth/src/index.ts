import { connectDB } from "./config/db"
import { app } from "./app";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
import { kafkaClient } from "./config/kafka-connection";


const start = async () => {
	console.log("Starting up....");

	// if we do not set JWT_SECRET_KEY
	if(!process.env.JWT_SECRET_KEY){
		throw new Error("JWT_SECRET_KEY must be defined")
	}

	// if we do not set JWT_REFRESH_SECRET_KEY
	if(!process.env.JWT_REFRESH_SECRET_KEY){
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined")
	}

	// if we do not set mongo_uri
	if (!process.env.MONGO_URL_AUTH) {
		throw new Error("MONGO_URL_AUTH must be defined");
	}

	// if we do not set twilio auth token
	if (!process.env.TWILIO_AUTH_TOKEN) {
		throw new Error("TWILIO_AUTH_TOKEN must be defined");
	}

	// if we do not set twilio account sid
	if (!process.env.TWILIO_ACCOUNT_SID) {
		throw new Error("TWILIO_ACCOUNT_SID must be defined");
	}

	// if we do not set twilio service sid
	if (!process.env.TWILIO_SERVICE_SID) {
		throw new Error("TWILIO_SERVICE_SID must be defined");
	}

	// to connect to mongodb
	await connectDB();

	// it is used to listen to incomming message from kafka topics
	const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient)
	await userUpdatedEvent.subscribe()


	app.listen(3000, () => {
		console.log("auth Listening on port 3000....");
	})
	.on("error", async () => {
		await userUpdatedEvent.disconnect();
	})
	.on("close", async () => {
		await userUpdatedEvent.disconnect();
	});
};

start();
