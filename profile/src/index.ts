import { connectDB } from "./config/db";
import { app } from "./frameworks/express/app";
import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
import { CompanyProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/company-profile-updated-consumer";
import { kafkaClient } from "./config/kafka-connection";

const start = async () => {
	console.log("Starting up profile....");

	//if we do not set JWT_SECRET_KEY
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT_SECRET_KEY must be defined");
	}

	// if we do not set JWT_REFRESH_SECRET_KEY
	if (!process.env.JWT_REFRESH_SECRET_KEY) {
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");
	}

	//if we do not set mongo_uri

	if (!process.env.MONGO_URL_PROFILE) {
		throw new Error("MONGO_URL_PROFILE must be defined");
	}
	
	if (!process.env.CLOUDINARY_API_KEY) {
		throw new Error("CLOUDINARY_API_KEY must be defined");
	}

	if (!process.env.CLOUDINARY_API_SECRET) {
		throw new Error("CLOUDINARY_API_SECRET must be defined");
	}

	if (!process.env.CLOUDINARY_CLOUD_NAME) {
		throw new Error("CLOUDINARY_CLOUD_NAME must be defined");
	}


	// to connect to mongodb
	await connectDB();

	// it is used to listen to incomming message from kafka topics
	const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
	const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);
	// const companyProfileUpdatedEvent = new CompanyProfileUpdatedEventConsumer(
	// 	kafkaClient
	// );
	
	await userCreatedEvent.subscribe();
	await userUpdatedEvent.subscribe();
	// await companyProfileUpdatedEvent.subscribe();

	app.listen(3000, () => {
		console.log("profile Listening on port 3000....");
	})
		.on("error", async () => {
			await userCreatedEvent.disconnect();
			await userUpdatedEvent.disconnect();
			// await companyProfileUpdatedEvent.disconnect();
		})
		.on("close", async () => {
			await userCreatedEvent.disconnect();
			await userUpdatedEvent.disconnect();
			// await companyProfileUpdatedEvent.disconnect();
		});
};

start();
