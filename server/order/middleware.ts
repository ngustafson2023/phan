import type { Request, Response, NextFunction } from "express";
import { HydratedDocument, isValidObjectId, Types } from "mongoose";
import { FoodItem } from "../fooditem/model";
import OrderCollection from "./collection";

const isOrderExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.body.orderId || req.params.orderId || req.query.orderId;
  const validId = Types.ObjectId.isValid(id);
  let found;

  if (validId) {
    found = await OrderCollection.findOne(id);
  }

  return validId && found
    ? next()
    : res.status(404).json({ error: "order could not be found" });
};

const isValidOrderModifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.body.orderId || req.params.orderId || req.query.orderId;
  const validId = Types.ObjectId.isValid(id);
  let found;

  if (validId) {
    const order = await OrderCollection.findOne(id);
    found = order ? (order as any).userId._id === req.session.userId : false; // checks user who made the order is one who sent request
  }

  return validId && found
    ? next()
    : res.status(404).json({ error: "order could not be found" });
};

const isValidItemsList = async (
  req: Request,
  res: Response,
  next: NextFunction,
  list: FoodItem[]
) => {
  return list.length > 0
    ? next()
    : res
        .status(400)
        .json({ error: "order placed must contain at least one food item" }); // order must contain items
};

export { isValidItemsList, isOrderExists, isValidOrderModifier };
