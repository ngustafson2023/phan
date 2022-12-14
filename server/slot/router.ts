import type { NextFunction, Request, Response } from "express";
import express from "express";
import SlotCollection from "./collection";
import FoodBankCollection from "./collection";
import * as slotValidator from "../slot/middleware";

import { Slot } from "./model";
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
 * @param {number} quantity
 * @return {slot} - The created slot
 * @param {string} foodBankId
 * @return {Slot}
 */
router.post("/", 
[
  slotValidator.isValidTimeSlot
], 
async (req: Request, res: Response) => {
  const foodBankId = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
  const slot = await SlotCollection.addOne(
    foodBankId,
    req.body.startTime,
    req.body.quantity
  );

  res.status(201).json({
    message: "Your slot was created successfully.",
    slot: util.constructSlotItemResponse(slot),
  });
});

//  * Create a list of slots
//  *
//  * @name GET /api/slot?id=foodBankId
//  *
//  * @param {string} foodBankId
//  * @return {Slot}
//  */
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if foodBankId query parameter was supplied
    if (req.query.id !== undefined) {
      next();
      return;
    }
    res.status(403).json({ error: "Cannot get slots..." });
  },
  async (req: Request, res: Response) => {
    const slots = await SlotCollection.findAllByFoodBankId(
      req.query.id as string
    );
    res.status(200).json({
      message: "success",
      slots: slots.map(util.constructSlotItemResponse),
    });
  }
);

// PATCH /api/slot?id=slotId

router.patch(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if slotId query parameter was supplied
    if (req.query.id !== undefined) {
      next();
      return;
    }
    res.status(403).json({ error: "Cannot update slot..." });
  },
  async (req: Request, res: Response) => {
    const slot = await SlotCollection.findOneById(req.query.id as string);
    const updatedSlot = await SlotCollection.updateOneById(
      slot._id,
      slot.startTime,
      (slot.quantity as number) - 1
    );
    res.status(200).json({
      message: "success",
      slot: util.constructSlotItemResponse(updatedSlot),
    });
  }
)

export { router as slotRouter };
