import { connectDB } from "./config/db";
import { app } from "./app";

const start = async () => {
	console.log("Job Starting up....");

	// // if we do not set JWT_SECRET_KEY
	// if (!process.env.JWT_SECRET_KEY) {
	// 	throw new Error("JWT_SECRET_KEY must be defined");
	// }

	// // if we do not set mongo_uri
	// if (!process.env.MONGO_URL_JOB) {
	// 	throw new Error("MONGO_URL_JOB must be defined");
	// }

	app.listen(3000, () => {
		console.log("job Listening on port 3000....");
		connectDB();
		// consumeMessage()
	});
};

start();
