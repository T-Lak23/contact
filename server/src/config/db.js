import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("DB connected", conn.connection.host);
  } catch (error) {
    console.log("Db connection failed", error);
    process.exit(1);
  }
};
