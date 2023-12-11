import { connectDB } from "./config/db"
import { app } from "./app";
import { UserCreatedEventConsumer } from "./frameworks/services/kafka-events/consumers/user-created-consumer";
import { kafkaClient } from "./config/kafka-connection";


const start = async () => {
	console.log("Starting up....");

	//if we do not set JWT_SECRET_KEY
	if(!process.env.JWT_SECRET_KEY){
		throw new Error("JWT_SECRET_KEY must be defined")
	}

	//if we do not set mongo_uri
	if (!process.env.MONGO_URL_ADMIN) {
		throw new Error("MONGO_URL_ADMIN must be defined");
	}

	// to connect to mongodb
	await connectDB();

	// it is used to listen to incomming message from kafka topics
	const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient)
	await userCreatedEvent.subscribe()


	app.listen(3000, () => {
		console.log("admin Listening on port 3000....");
	})
	.on("error", async () => {
		await userCreatedEvent.disconnect();
	})
	.on("close", async () => {
		await userCreatedEvent.disconnect();
	});
};

start();