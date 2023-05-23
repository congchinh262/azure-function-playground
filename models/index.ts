import mongoose, { mongo } from "mongoose";
import { MONGO_CONFIGS } from "../configs";
export const mongoClient = mongoose;

const connectDB = async () => {
  await mongoClient.connect(MONGO_CONFIGS.MONGO_URL, {
    autoIndex: true,
    autoCreate: true,
  });
  mongoClient.connection
    .on("connected", () => console.log("MongoDB connected"))
    .on("error", (err) => console.log(err));
};

export default connectDB;
