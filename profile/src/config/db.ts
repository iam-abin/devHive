import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL_PROFILE as string);
		console.log("connected to mongodb...");
    } catch (error) {
        console.log("profile mongodb connection failed!!!!");
		console.log(error);
    }
}
export { connectDB }