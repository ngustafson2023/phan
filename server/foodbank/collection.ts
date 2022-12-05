import type { HydratedDocument, Types } from "mongoose";
import type { FoodBank } from "./model";
import FoodBankModel from "./model";
import { getFoodbankRestrictions, getFoodbankStockLevel } from "./util";

class FoodBankCollection {
  /**
   * Find foodbanks info
   *
   * @param {string} foodBankId - The foodBankId of the foodbank to find
   * @return {Promise<HydratedDocument<FoodBank>> | Promise<null>} - The fb with the given id, if any
   */
  static async findFoodbankById(
    foodBankId: Types.ObjectId | string
  ): Promise<HydratedDocument<FoodBank>> {
    return FoodBankModel.findOne({ _id: foodBankId });
  }

  /**
   * Find foodbanks with filters.
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<FoodBank>> | Promise<null>} - The user with the given username, if any
   */
  static async findFoodbanks(
    stockLevels: string[],
    restrictions: string[]
  ): Promise<HydratedDocument<FoodBank>[]> {
    const banks = await FoodBankModel.find({});
    if (!stockLevels.length && !restrictions.length) {
      return banks;
    }
    const filteredBanks = banks
      .filter((b) => {
        const bankRestrictions = getFoodbankRestrictions(b._id);
        restrictions.forEach((restriction) => {
          if (!bankRestrictions.includes(restriction)) {
            return false;
          }
        });
        return true;
      })
      .filter(
        (b) =>
          stockLevels.length == 0 ||
          stockLevels.includes(getFoodbankStockLevel(b._id))
      );
    return filteredBanks;
  }

  /**
   * Find a food bank by username (case insensitive).
   *
   * @param {string} username - The username of the food bank to find
   * @return {Promise<HydratedDocument<FoodBank>> | Promise<null>} - The food bank with the given username, if any
   */
  static async findOneByUsername(
    username: string
  ): Promise<HydratedDocument<FoodBank>> {
    return FoodBankModel.findOne({
      name: new RegExp(`^${username.trim()}$`, "i"),
    });
  }
}

export default FoodBankCollection;
