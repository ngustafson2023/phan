import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FoodBankCollection from '../foodbank/collection';
import FoodItemCollection from './collection';
import * as foodBankValidator from '../foodbank/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get a list of items in a foodbank's inventory
 * @name GET /api/fooditem?id=foodbank
 */
router.get(
  '/',
  [
    //foodBankValidator.isFoodBankExists
  ],
  async (req: Request, res: Response) => {
  //const foodBank = await FoodBankCollection.findOneByUsername(req.query.name as string);
  //const inventory = await FoodItemCollection.findAllByFoodBank(foodBank._id);
  const inventory = await FoodItemCollection.findAllByFoodBank(req.query.id as string);
  const response = inventory.map(util.constructFoodItemResponse);
  res.status(200).json(response);
  }
);

export { router as foodItemRouter };