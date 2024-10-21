import { DatabaseConnectionError } from "@abijobportal/common";
import mongoose from "mongoose";
import { appConfig } from "./appConfig";

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(appConfig.MONGO_URL_ADMIN);
		console.log("admin service connected to mongodb...");
	} catch (error) {
		console.error("admin service mongodb connection failed!!!!",error);
		throw new DatabaseConnectionError()
	}
};

export { connectDB }