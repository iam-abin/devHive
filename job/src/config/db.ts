import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL_JOB as string);
		console.log("job service connected to mongodb...");
    } catch (error) {
        console.log("job mongodb connection failed!!!!");
		console.log(error);
    }
}
export { connectDB }