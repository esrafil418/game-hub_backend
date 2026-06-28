import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

app.get("/", (req, res) => {
	res.send("API Working");
});

app.listen(port, () => {
	console.log(`Server Started on http://localhost:${port}`);
});
