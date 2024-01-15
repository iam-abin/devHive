import { connectDB } from "./config/db";
import { app, httpServer } from "./frameworks/express/app";
import { setupSocketIO } from "./frameworks/webSocket/socket";


const start = async() => {
	console.log("chat service Starting up....");

    if (!process.env.MONGO_URL_CHAT) {
		throw new Error("MONGO_URL_CHAT must be defined");
	}

    setupSocketIO(httpServer);

    await connectDB()
    
    app.listen(3000, ()=>{
        console.log("chat service Listening on port 3000....");
    })

};

start();
