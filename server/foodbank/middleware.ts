import type {Request, Response, NextFunction} from 'express';
import FoodBankCollection from './collection';

/**
 * Checks if a food bank with username  in req.query exists
 */
 const isFoodBankExists = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.username) {
      res.status(400).json({
        error: 'Provided username must be nonempty.'
      });
      return;
    }
  
    const user = await FoodBankCollection.findOneByUsername(req.query.username as string);
    if (!user) {
      res.status(404).json({
        error: `A foodbank with username ${req.query.username as string} does not exist.`
      });
      return;
    }
  
    next();
  };

export {
    isFoodBankExists
};
