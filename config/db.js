import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_URL, {});
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch(error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure 1, 0 is success
  }
}