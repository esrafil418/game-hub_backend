import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
	try {
		if (
			process.env.MONGO_URI &&
			process.env.MONGO_URI.startsWith("mongodb+srv://")
		) {
			dns.setServers(["1.1.1.1", "8.8.8.8"]);
		}

		await mongoose.connect(process.env.MONGO_URI);
		console.log("DB Connected!");
	} catch (error) {
		console.log("DB Connection Error:", error.message);
	}
};
