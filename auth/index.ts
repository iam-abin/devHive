import { connectDB } from "./src/config/db"
import { app } from "./src/app";


const start = async () => {
	console.log("Starting up....");

	// //if we do not set JWT_SECRET_KEY
	// if(!process.env.JWT_SECRET_KEY){
	// 	throw new Error("JWT_SECRET_KEY must be defined")
	// }

	// //if we do not set mongo_uri
	// if (!process.env.MONGO_URI) {
	// 	throw new Error("MONGO_URI must be defined");
	// }


	app.listen(4000, () => {
		console.log("auth Listening on port 4000....");
        connectDB();
	});
};

start();
