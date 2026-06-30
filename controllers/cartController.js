import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartData = (await userData.cartData) || {};

		const itemId = Number(req.body.itemId);

		if (!cartData[itemId]) {
			cartData[itemId] = 1;
		} else {
			cartData[itemId] = Number(cartData[itemId]) + 1;
		}

		await userModel.findByIdAndUpdate(req.body.userId, { cartData });
		res.json({ success: true, message: "Added To Cart" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error adding to cart" });
	}
};

// remove from user cart
const removeFromCart = async (req, res) => {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartData = (await userData.cartData) || {};

		const itemId = Number(req.body.itemId);

		if (cartData[itemId] && cartData[itemId] > 0) {
			cartData[itemId] = Number(cartData[itemId]) - 1;

			if (cartData[itemId] === 0) {
				delete cartData[itemId];
			}
		}

		await userModel.findByIdAndUpdate(req.body.userId, { cartData });
		res.json({ success: true, message: "Removed From Cart" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error removing from cart" });
	}
};

// fetch user cart data
const getCart = async (req, res) => {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartData = (await userData.cartData) || {};

		const cleanCartData = {};
		for (const [itemId, quantity] of Object.entries(cartData)) {
			const numQuantity = Number(quantity);
			if (numQuantity > 0) {
				cleanCartData[Number(itemId)] = numQuantity; // Convert itemId to number
			}
		}

		res.json({ success: true, cartData: cleanCartData });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error fetching cart" });
	}
};

export { addToCart, removeFromCart, getCart };
