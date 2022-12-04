import type { NextFunction, Request, Response } from "express";
import express from "express";
import FoodItemCollection from "../fooditem/collection";
import UserCollection from "../user/collection";
import OrderCollection from "./collection";
import FoodBankCollection from "./collection";
import * as util from "./util";

const router = express.Router();

/**
 * Create a list orders by user
 *
 * @name GET /api/orders?username=username
 *
 * @return {Order} - The orders that user has placed
 * @throws {403} - If try to get all orders
 * @throws {409} - If username is already taken
 * @throws {400} - If password or username is not in correct format
 *
 */
router.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		// Check if authorId query parameter was supplied
		if (req.query.username !== undefined) {
			next();
			return;
		}

		res.status(403).json("Cannot view all orders...");
	},
	async (req: Request, res: Response) => {
		const user = UserCollection.findOneByUsername(req.query.username as string);
		const orders = await OrderCollection.findAllByUser((await user)._id);
		res.status(200).json(orders);
	}
);

/**
 * Create a new order
 * @name POST /api/orders
 * 
 * @param slotId
 * @param foodBankId
 * @param items 
 */
router.post(
	'/',
	[
	],
	async (req: Request, res: Response) => {
		console.log(req.body);
 		const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
		const itemsArr = [];
		for (const [name, quantity] of Object.entries(req.body.items)) {
			console.log(`name ${name} quantity ${quantity}`);
			 const foodItem = await FoodItemCollection.findOne(req.body.foodBankId, name);
			// decrease quantity in foodItem
			const newQuantity = parseInt(foodItem.quantity.toString()) - parseInt(quantity.toString()); // unsure about this
			await FoodItemCollection.updateOneById(foodItem._id, foodItem.name, newQuantity);

			const item = {
				foodItemId: foodItem._id,
				quantity: quantity
			} 
			itemsArr.push(item); 
		}
		const order = await OrderCollection.addOne(userId, req.body.slotId, itemsArr);
	
		res.status(201).json({
		  message: 'Your order was created successfully.'
		}); 
	  }
);

export { router as orderRouter };
