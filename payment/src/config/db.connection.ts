import { DatabaseConnectionError } from "@abijobportal/common";
import mongoose from "mongoose";
import { config } from "./appConfig";

const connectDB = async (): Promise<void> => {
	try {
        await mongoose.connect(config.MONGO_URL_PAYMENT as string)
        console.log("payment service connected to mongodb...");
	} catch (error) {
		console.error("payment service mongodb connection failed!!!!",error);
		throw new DatabaseConnectionError()
	}
};

export { connectDB };
