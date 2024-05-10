import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()
export const connectDB = async() => {
         await mongoose.connect(process.env.CONNECTION_STRING) 
}