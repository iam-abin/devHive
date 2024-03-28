import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL_JOB as string);
		console.log("job service connected to mongodb...");
    } catch (error) {
        console.error("job service mongodb connection failed!!!!",error);
    }
}
export { connectDB }