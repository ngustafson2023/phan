import type { NextFunction, Request, Response } from "express";
import express from "express";
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
router.post(
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

export { router as orderRouter };
