import gameModel from "../models/gameModel.js";
import fs from "fs";

// add game item
export const addGame = async (req, res) => {
	let image_filename = `${req.file.filename}`;

	const game = new gameModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image: image_filename,
	});
	try {
		await game.save();
		res.json({ success: true, message: "Game added successfully" });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to add game",
			error: error.message,
		});
	}
};
