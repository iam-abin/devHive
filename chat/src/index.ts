import { connectDB } from "./config/db";
import { app } from "./frameworks/express/app";

const start = async() => {
	console.log("chat service Starting up....");

    await connectDB()


    app.listen(3000, ()=>{
        console.log("chat service Listening on port 3000....");
    })
};

start();
