import type { Request, Response, NextFunction } from "express";
import { HydratedDocument, isValidObjectId, Types } from "mongoose";
import FoodBankCollection from "../foodbank/collection";
import { FoodItem } from "../fooditem/model";
import FoodItemCollection from "./collection";
import OrderCollection from "./collection";

const isRegisteredFoodBank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foodBankId =
    req.params.foodBankId || req.body.foodBankId || req.query.foodBankId;

  const validId = Types.ObjectId.isValid(foodBankId);
  let found;

  if (validId) {
    // found = await FoodBankCollection.findFoodbanks(foodBankId); // TODO??
    found = true;
  }

  return validId && found
    ? next()
    : res.status(404).json({
        error:
          "food bank is has not been registered yet. please try again later",
      });
};

const isFoodItemExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foodItemId =
    req.params.foodItemId || req.body.foodItemId || req.query.foodItemId;

  const validId = Types.ObjectId.isValid(foodItemId);
  let found;

  if (validId) {
    found = await FoodItemCollection.findOneById(foodItemId); // TODO??
  }

  return validId && found
    ? next()
    : res.status(404).json({
        error: "food item could not be found. please try again later",
      });
};

const isValidFoodItemModifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foodBankId =
    req.params.foodBankId || req.body.foodBankId || req.query.foodBankId;

  return req.session.userId === foodBankId
    ? next()
    : res.status(400).json({
        error:
          "item cannot be modified. if you are the food bank that owns this item, please log in and try again",
      });
};

export { isValidFoodItemModifier, isRegisteredFoodBank, isFoodItemExists };
