import { connectDB } from "./config/db";
import { app } from "./frameworks/express/app";
// import { CompanyProfileUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/company-profile-updated-consumer";
import { kafkaClient } from "./config/kafka-connection";
import { MembershipPlanCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/premium-plan-created-consumet";

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

	if (!process.env.MONGO_URL_PAYMENT) {
		throw new Error("MONGO_URL_PROFILE must be defined");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("STRIPE_SECRET_KEY must be defined");
	}

	const membershipPlanCreatedEvent = new MembershipPlanCreatedEventConsumer(
		kafkaClient
	);

	// await membershipPlanCreatedEvent.subscribe();

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
