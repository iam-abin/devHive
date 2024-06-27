import { DatabaseConnectionError } from "@abijobportal/common";
import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL_ADMIN as string);
		console.log("admin service connected to mongodb...");
	} catch (error) {
		console.error("admin service mongodb connection failed!!!!",error);
		throw new DatabaseConnectionError()
	}
};

export { connectDB }