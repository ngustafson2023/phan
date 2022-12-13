import type { HydratedDocument } from "mongoose";
import type { FoodItem } from "./model";

type FoodItemResponse = {
	_id: string;
	foodBankId: string;
	name: string;
	quantity: string;
};

/**
 * Transform a raw FoodItem object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<FoodItem>} foodItem
 * @returns {FoodItemResponse} - The foodItem object formatted for the frontend
 */
const constructFoodItemResponse = (foodItem: HydratedDocument<FoodItem>): FoodItemResponse => {
	const foodItemCopy: FoodItem = {
		...foodItem.toObject({
			versionKey: false, // Cosmetics; prevents returning of __v property
		}),
	};

	return {
		...foodItemCopy,
		_id: foodItemCopy._id.toString(),
		foodBankId: foodItemCopy.foodBankId._id.toString(),
		name: foodItemCopy.name.toString(),
		quantity: foodItemCopy.quantity.toString(),
	};
};

export { constructFoodItemResponse };
