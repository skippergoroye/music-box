import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectMongoDB = async () => {
  mongoose.set("strictQuery", false);
  const connect = await mongoose.connect(process.env.DATABASE_URL!);
//   console.log(connect);
  console.log(`MongDB Database Connected Successfully`);
};

export default connectMongoDB;