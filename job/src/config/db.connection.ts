import { DatabaseConnectionError } from "@abijobportal/common";
import mongoose from "mongoose";
import { appConfig } from "./appConfig";

const connectDB = async ()=>{
    try {
        await mongoose.connect(appConfig.MONGO_URL_JOB);
		console.log("job service connected to mongodb...");
    } catch (error) {
        console.error("job service mongodb connection failed!!!!",error);
        throw new DatabaseConnectionError()
    }
}
export { connectDB }