import { connectDB } from "./config/db";
import { app } from "./app";


const start = ()=>{
    console.log("Starting up profile....");

	//if we do not set JWT_SECRET_KEY
	if(!process.env.JWT_SECRET_KEY){
		throw new Error("JWT_SECRET_KEY must be defined")
	}

    	//if we do not set mongo_uri
	if (!process.env.MONGO_URL_PROFILE) {
		throw new Error("MONGO_URL_PROFILE must be defined");
	}

    app.listen(3000, ()=>{
        console.log("profile Listening on port 3000....");
		connectDB()
    })

}

start();