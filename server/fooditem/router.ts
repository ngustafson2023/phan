import type { NextFunction, Request, Response } from "express";
import express from "express";
import FoodBankCollection from "../foodbank/collection";
import FoodItemCollection from "./collection";
import * as foodBankValidator from "../foodbank/middleware";
import * as util from "./util";
import * as foodItemValidator from "./middleware";

const router = express.Router();

/**
 * Get a list of items in a foodbank's inventory
 * @name GET /api/fooditem?name=foodbank
 */
router.get(
  "/",
  [foodBankValidator.isFoodBankExists],
  async (req: Request, res: Response) => {
    const foodBank = await FoodBankCollection.findOneByUsername(
      req.query.name as string
    );
    const inventory = await FoodItemCollection.findAllByFoodBank(foodBank._id);
    const response = inventory.map(util.constructFoodItemResponse);
    res.status(200).json(response);
  }
);

/**
 * Get a list of items in a foodbank's inventory
 * @name PATCH /api/fooditem
 */
router.patch(
  "/",
  [foodItemValidator.isFoodItemExists],
  async (req: Request, res: Response, next: NextFunction) => {
    const { foodItemId, name, restrictions, quantity } = req.body;
    return await FoodItemCollection.updateOneById(
      foodItemId,
      name,
      quantity,
      restrictions
    )
      .then((foodItem) =>
        res.status(200).json({ message: "updated foodItem", foodItem })
      )
      .catch((e) =>
        res
          .status(500)
          .json({ error: "Could not update food item. Please try again later" })
      );
  }
);

export { router as foodItemRouter };
