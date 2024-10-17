import { connectDB } from "./config/db.connection"
import { app } from "./frameworks/express/app";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
import { kafkaClient } from "./config/kafka.connection";
import { appConfig } from "./config/appConfig";


const start = async () => {
	console.log("Starting up....");

	if(!process.env.JWT_SECRET_KEY)
		throw new Error("JWT_SECRET_KEY must be defined")

	if(!appConfig.JWT_REFRESH_SECRET_KEY)
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined")

	if (!appConfig.MONGO_URL_AUTH)
		throw new Error("MONGO_URL_AUTH must be defined");

	if (!appConfig.TWILIO_AUTH_TOKEN) 
		throw new Error("TWILIO_AUTH_TOKEN must be defined");

	if (!appConfig.TWILIO_ACCOUNT_SID) 
		throw new Error("TWILIO_ACCOUNT_SID must be defined");

	if (!appConfig.TWILIO_SERVICE_SID)
		throw new Error("TWILIO_SERVICE_SID must be defined");
	
	// to connect to mongodb
	await connectDB();

	
	// it is used to listen to incomming message from kafka topics
	const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient)
	
	await userUpdatedEvent.subscribe()

	app.listen(appConfig.PORT, () => {
		console.log(`auth Listening on port ${appConfig.PORT}....`);
	})
	.on("error", async () => {
		await userUpdatedEvent.disconnect();
		
	})
	.on("close", async () => {
		await userUpdatedEvent.disconnect();
	});
};


start();
