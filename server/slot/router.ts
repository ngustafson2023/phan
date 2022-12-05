import type { NextFunction, Request, Response } from "express";
import express from "express";
import SlotCollection from "./collection";
import { Slot } from "./model";
import * as util from "./util";

const router = express.Router();

/**
 * Create a list of slots
 *
 * @name GET /api/slot?id=foodBankId
 *
 * @param {string} foodBankId 
 * @return {Slot}
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    // Check if foodBankId query parameter was supplied
		if (req.query.id !== undefined) {
			next();
			return;
		}
		res.status(403).json("Cannot get slots...");
	},
	async (req: Request, res: Response) => {
		const slots = await SlotCollection.findAllByFoodBankId(req.query.id as string);
		res.status(200).json(slots);
	});

export { router as slotRouter };
