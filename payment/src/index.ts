import { connectDB } from "./config/db.connection";
import { app } from "./frameworks/express/app";
import { kafkaClient } from "./config/kafka.connection";
import { MembershipPlanCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/premium-plan-created-consumet";
import { config } from "./config/appConfig";

const start = async () => {
	console.log("Starting up profile....");

	if (!config.JWT_SECRET_KEY) 
		throw new Error("JWT_SECRET_KEY must be defined");

	if (!config.JWT_REFRESH_SECRET_KEY)
		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");

	if (!config.MONGO_URL_PAYMENT)
		throw new Error("MONGO_URL_PROFILE must be defined");

	if (!config.STRIPE_SECRET_KEY)
		throw new Error("STRIPE_SECRET_KEY must be defined");

	const membershipPlanCreatedEvent = new MembershipPlanCreatedEventConsumer(
		kafkaClient
	);

	await membershipPlanCreatedEvent.subscribe();

	// to connect to mongodb
	await connectDB();

	app.listen(3000, () => {
		console.log("payment Listening on port 3000....");
	})
		.on("error", async () => {
			await membershipPlanCreatedEvent.disconnect();
		})
		.on("close", async () => {
			await membershipPlanCreatedEvent.disconnect();
		});
};

start();
