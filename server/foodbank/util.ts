import type { HydratedDocument, Types } from "mongoose";
import moment from "moment";
import type { FoodBank } from "./model";
import FoodItemCollection from "../fooditem/collection";

const getFoodbankStockLevel = async (foodbankId: Types.ObjectId | string) => {
	// Need to get all items, check their stock, and filter
	// Less than 5 is low
	// 5 to 20 is medium
	// over 20 is high
	const items = await FoodItemCollection.findAllByFoodBank(foodbankId);
	const stockLevels = items
		.map((i) => i.quantity)
		.map((n) => n as number)
		.reduce((p, c) => p + c, 0);
	const avg = stockLevels / items.length;
	if (avg > 10) {
		return "High";
	} else if (avg > 5) {
		return "Medium";
	} else {
		return "Low";
	}
};

const getFoodbankRestrictions = async (foodbankId: Types.ObjectId | string) => {
	// Need to get all items that are in stock, check what restrictions they meet, and concat
	const items = await FoodItemCollection.findAllByFoodBank(foodbankId);
	const restrictions = items.map((i) => i.restrictions).flat();
	return restrictions;
};

export { getFoodbankRestrictions, getFoodbankStockLevel };
