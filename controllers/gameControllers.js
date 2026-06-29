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

export const listGame = async (req, res) => {
	try {
		const games = await gameModel.find({});
		res.json({ success: true, data: games });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch games",
			error: error.message,
		});
	}
};

// remove game item
export const removeGame = async (req, res) => {
	try {
		const game = await gameModel.findById(req.body._id);
		fs.unlink(`uploads/${game.image}`, () => {});

		await gameModel.findByIdAndDelete(req.body._id);
		res.json({ success: true, message: "Game removed successfully" });
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: "Failed to remove game",
			error: error.message,
		});
	}
};
