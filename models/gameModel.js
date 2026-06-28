import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String, required: true },
	category: { type: String, required: true },
});

const gameModel = mongoose.models.game || mongoose.model("game", gameSchema);
export default gameModel;
