import type { HydratedDocument, Types } from "mongoose";
import FoodItemModel, { FoodItem } from "./model";

class FoodItemCollection {
  /**
   * add a fooditem
   *
   * @return {Promise<HydratedDocument<FoodItem>> | Promise<null>} - The fooditem created
   */
  static async addOne(
    foodBankId: Types.ObjectId,
    name: String,
    quantity: Number,
    restrictions: []
  ): Promise<HydratedDocument<FoodItem>[]> {
    const foodItem = new FoodItemModel({
      name,
      foodBankId,
      quantity,
      restrictions,
    });

    await foodItem.save();

    return foodItem.populate("foodBankId");
  }

  /**
   * Find one fooditem
   *
   * @return {Promise<HydratedDocument<FoodItem> > | Promise<null>} - the matching foodItem
   */
  static async findOne(
    foodBankId: Types.ObjectId,
    name: String
  ): Promise<HydratedDocument<FoodItem>> {
    return await FoodItemModel.findOne({
      foodBankId: foodBankId,
      name: name,
    }).populate("foodBankId");
  }

  /**
   * Find one fooditem by foodItemId
   *
   * @return {Promise<HydratedDocument<FoodItem> > | Promise<null>} - the matching foodItem
   */
  static async findOneById(
    _id: Types.ObjectId
  ): Promise<HydratedDocument<FoodItem> | null> {
    return await FoodItemModel.findOne({ _id }).populate("foodBankId");
  }

  /**
   * Find all fooditems associated with a foodbank
   *
   * @return {Promise<HydratedDocument<FoodItem> > | Promise<null>} - the matching foodItems
   */
  static async findAllByFoodBank(
    foodBankId: Types.ObjectId | string
  ): Promise<HydratedDocument<FoodItem>[]> {
    return await FoodItemModel.find({ foodBankId }).populate("foodBankId");
  }

  /**
   * Find all fooditem
   *
   * @return {Promise<HydratedDocument<FoodItem>[]> | Promise<null>} - all foodItems
   */
  static async findAll(): Promise<HydratedDocument<FoodItem>[]> {
    return await FoodItemModel.find({}).populate("foodBankId");
  }

  /**
   * updates a foodItem based on Id
   *
   * @return {Promise<HydratedDocument<FoodItem> > | Promise<null>} - updated foodItem
   */
  static async updateOneById(
    foodItemId: Types.ObjectId,
    name?: String,
    quantity?: Number,
    restrictions?: String[]
  ): Promise<HydratedDocument<FoodItem>> {
    const foodItem = (await FoodItemModel.findOne({ _id: foodItemId })) as any;

    if (name) {
      foodItem.name = name;
    }
    if (quantity) {
      foodItem.quantity = quantity;
    }
    if (restrictions) {
      foodItem.restrictions = restrictions;
    }
    return (await foodItem.save()).populate("foodBankId");
  }

  /**
   * deletes a foodItem based on query
   *
   * @return {Promise<boolean>} - whether item was deleted
   */
  static async deleteById(foodItemId: Types.ObjectId): Promise<boolean> {
    return (await FoodItemModel.deleteOne({ _id: foodItemId })) !== null;
  }

  /**
   * deletes a foodItem based on query
   *
   * @return {Promise<number>} - deleted count
   */
  static async deleteMany(filter: any): Promise<number> {
    return (await FoodItemModel.deleteMany(...filter)).deletedCount;
  }
}

export default FoodItemCollection;
