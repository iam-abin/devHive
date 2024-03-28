import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL_AUTH as string);
		console.log("auth service connected to mongodb...");
	} catch (error) {
		console.error("auth service mongodb connection failed!!!!",error);
	}
};

export { connectDB }