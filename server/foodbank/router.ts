import type { Request, Response } from "express";
import express from "express";
import FoodBankCollection from "./collection";
import * as util from "./util";

const router = express.Router();

/**
 * Create a list of footbanks
 *
 * @name GET /api/foodbanks
 *
 * @param {string} stockLevels - stock levels to include
 * @param {string} restrictions - restrictions to obey
 * @return {FoodBank} - The created user
 * @throws {403} - If there is a user already logged in
 * @throws {409} - If username is already taken
 * @throws {400} - If password or username is not in correct format
 *
 */
/* router.post("/", async (req: Request, res: Response) => {
	const stockLevels = req.body.stockLevels.split("|");
	const restrictions = req.body.restrictions.split("|");
	const banks = await FoodBankCollection.findFoodbanks(stockLevels, restrictions);
	res.status(201).json({
		message: `Here's food banks with your criteria`,
		foodbanks: banks,
	});
}); */

export { router as foodBankRouter };
