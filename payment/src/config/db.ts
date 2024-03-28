import mongoose from "mongoose";

const connectDB = async () => {
	try {
        await mongoose.connect(process.env.MONGO_URL_PAYMENT as string)
        console.log("payment service connected to mongodb...");
	} catch (error) {
		console.error("payment service mongodb connection failed!!!!",error);
	}
};

export { connectDB };
