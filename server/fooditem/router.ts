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
 * @name GET /api/fooditem?id=foodbank
 */
router.get("/", async (req: Request, res: Response) => {
  const inventory = await FoodItemCollection.findAllByFoodBank(
    req.query.id as string
  );
  const response = inventory.map(util.constructFoodItemResponse);
  res.status(200).json(response);
});

/**
 * create a fooditem
 * @name POST /api/fooditem
 */
router.post(
  "/",
  [foodItemValidator.isValidFoodItemModifier],
  async (req: Request, res: Response) => {
    const { foodBankId, name, quantity, restrictions } = req.body;
    //console.log("body back", foodBankId, name, quantity, restrictions);
    const foodItem = await FoodItemCollection.addOne(
      foodBankId,
      name,
      quantity,
      restrictions
    );

    const response = util.constructFoodItemResponse(foodItem as any);
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
