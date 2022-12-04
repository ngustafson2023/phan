import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FoodBankCollection from 'server/foodbank/collection';
import FoodItemCollection from './collection';
import * as foodBankValidator from '../foodbank/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get a list of items in a foodbank's inventory
 * @name GET /api/fooditem
 * 
 * @param name - name of food bank
 */
router.get(
  '/',
  [
    foodBankValidator.isFoodBankExists
  ],
  async (req: Request, res: Response) => {
  const foodBank = await FoodBankCollection.findOneByUsername(req.body.name);
  const inventory = await FoodItemCollection.findAllByFoodBank(foodBank._id);
  const response = inventory.map(util.constructFoodItemResponse);
  res.status(200).json(response);
  }
);

export { router as slotRouter };