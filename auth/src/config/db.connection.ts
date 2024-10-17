import { DatabaseConnectionError } from "@abijobportal/common";
import mongoose from "mongoose";
import { appConfig } from "./appConfig";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(appConfig.MONGO_URL_AUTH);
        console.log("auth service connected to mongodb...");
    } catch (error) {
        console.error("auth service mongodb connection failed!!!!", error);
        throw new DatabaseConnectionError();
    }
};

export { connectDB };
