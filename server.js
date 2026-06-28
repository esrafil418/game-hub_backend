import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import gameRouter from "./routes/gameRoute.js";
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

// api endpoints
app.use("/api/game", gameRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
	res.send("API Working");
});

app.listen(port, () => {
	console.log(`Server Started on http://localhost:${port}`);
});
