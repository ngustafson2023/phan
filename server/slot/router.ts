import type { Request, Response } from "express";
import express from "express";
import SlotCollection from "./collection";
import FoodBankCollection from "./collection";
import * as util from "./util";

const router = express.Router();

/**
 * Create a new slot.
 *
 * @name POST /api/slots
 *
 * @param {string} foodBankId
 * @param {date} string
 * @param {string} startTime 
 * @param {string} endTime
 * @param {number} quantity
 * @return {slot} - The created slot
 *
 */
 router.post(
    '/',
    [
    ],
    async (req: Request, res: Response) => {
      const foodBankId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const slot = await SlotCollection.addOne(foodBankId, req.body.startTime,req.body.endTime, req.body.quantity);
        
      res.status(201).json({
        message: 'Your freet was created successfully.',
        slot: slot
      });
    }
  );



export { router as slotRouter };
