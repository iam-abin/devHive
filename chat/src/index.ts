import { connectDB } from "./config/db";
import { kafkaClient } from "./config/kafka-connection";
import { app, httpServer } from "./frameworks/express/app";
import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
import { setupSocketIO } from "./frameworks/webSocket/socket";

const start = async () => {
	console.log("chat service Starting up....");

    //if we do not set MONGO_URL_CHAT
	if (!process.env.MONGO_URL_CHAT) {
		throw new Error("MONGO_URL_CHAT must be defined");
	}


    //if we do not set JWT_SECRET_KEY
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT_SECRET_KEY must be defined");
	}

	// if we do not set JWT_REFRESH_SECRET_KEY
	if (!process.env.JWT_REFRESH_SECRET_KEY) {
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");
	}
	
	console.log("before socket instance");
	setupSocketIO(httpServer);
	console.log("after socket instance");

	await connectDB();

	// const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
	// const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);

	
	// await userUpdatedEvent.subscribe();
	// await userCreatedEvent.subscribe();

	httpServer.listen(3000, () => {
		console.log("chat service Listening on port 3000....");
	})
		// .on("error", async () => {
		// 	await userUpdatedEvent.disconnect();
		// 	await userCreatedEvent.disconnect();
		// })
		// .on("close", async () => {
		// 	await userUpdatedEvent.disconnect();
		// 	await userCreatedEvent.disconnect();
		// });
};

start();