import { connectDB } from "./config/db.connection";
import { app } from "./frameworks/express/app";
import { kafkaClient } from "./config/kafka.connection";
import { MembershipPlanCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/premium-plan-created-consumet";
import { appConfig } from "./config/appConfig";

const start = async () => {
	console.log("Starting up profile....");

	if (!appConfig.JWT_SECRET_KEY) 
		throw new Error("JWT_SECRET_KEY must be defined");

	if (!appConfig.JWT_REFRESH_SECRET_KEY)
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");

	if (!appConfig.MONGO_URL_PAYMENT)
		throw new Error("MONGO_URL_PROFILE must be defined");

	if (!appConfig.STRIPE_SECRET_KEY)
		throw new Error("STRIPE_SECRET_KEY must be defined");

	const membershipPlanCreatedEvent = new MembershipPlanCreatedEventConsumer(
		kafkaClient
	);

	await membershipPlanCreatedEvent.subscribe();

	// to connect to mongodb
	await connectDB();

	app.listen(appConfig.PORT, () => {
		console.log(`payment Listening on port ${appConfig.PORT}....`);
	})
		.on("error", async () => {
			await membershipPlanCreatedEvent.disconnect();
		})
		.on("close", async () => {
			await membershipPlanCreatedEvent.disconnect();
		});
};

start();
