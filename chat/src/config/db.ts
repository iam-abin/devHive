import mongoose from "mongoose";

const connectDB = async () => {
	try {
        await mongoose.connect(process.env.MONGO_URL_CHAT as string)
        console.log("chat service connected to mongodb...");
	} catch (error) {
		console.error("chat service mongodb connection failed!!!!",error);
	}
};

export { connectDB };
