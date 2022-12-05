import type {Request, Response, NextFunction} from 'express';
import FoodBankCollection from './collection';

/**
 * Checks if a food bank with username  in req.query exists
 */
 const isFoodBankExists = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.name) {
      res.status(400).json({
        error: 'Provided username must be nonempty.'
      });
      return;
    }
  
    const bank = await FoodBankCollection.findOneByUsername(req.query.name as string);
    if (!bank) {
      res.status(404).json({
        error: `A foodbank with username ${req.query.name as string} does not exist.`
      });
      return;
    }
  
    next();
  };

export {
    isFoodBankExists
};
