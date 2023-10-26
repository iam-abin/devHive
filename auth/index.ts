import { connectDB } from "./src/config/db"
import { app } from "./src/app";


const start = async () => {
	console.log("Starting up....");


	app.listen(4000, () => {
		console.log("auth Listening on port 4000....");
        connectDB();
	});
};

start();
