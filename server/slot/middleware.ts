import type { Request, Response, NextFunction } from "express";
import { HydratedDocument, isValidObjectId, Types } from "mongoose";
import SlotCollection from "./collection";

const isValidTimeSlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime =
    req.params.startTime || req.body.startTime || req.query.startTime;

  const quantity =
    req.params.quantity || req.body.quantity || req.query.quantity;

  const validQuant = quantity > 0;

  return startTime && quantity
    ? next()
    : res.status(404).json({
        error: "Error slot could not be created. please enter all information",
      });
};

const isSlotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slotId = req.params.slotId || req.body.slotId || req.query.slotId;

  const validId = Types.ObjectId.isValid(slotId);
  let found;

  if (validId) {
    found = await SlotCollection.findOneById(slotId);
  }

  return validId && found
    ? next()
    : res.status(404).json({
        error: "slot could not be found. please try again later",
      });
};

const isValidSlotModifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slotId = req.params.slotId || req.body.slotId || req.query.slotId;

  const validId = Types.ObjectId.isValid(slotId);
  let validModifier;

  if (validId) {
    validModifier =
      ((await SlotCollection.findOneById(slotId)) as any).foodBankId._id ===
      req.session.userId;
  }

  return validId && validModifier
    ? next()
    : res.status(400).json({
        error:
          "slot cannot be modified. if you are the food bank that owns this slot, please log in and try again",
      });
};

export {
  isValidTimeSlot,

};