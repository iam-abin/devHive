import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL_PROFILE as string);
		console.log("profile service connected to mongodb...");
    } catch (error) {
		console.error("profile service mongodb connection failed!!!!",error);
    }
}
export { connectDB }