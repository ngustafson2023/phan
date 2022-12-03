import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { FoodBank } from "./model";

const getFoodbankStockLevel = (foodbankId: string) => {
	// Need to get all items, check their stock, and filter
	// Less than 5 is low
	// 5 to 20 is medium
	// over 20 is high
	return "Medium";
};

const getFoodbankRestrictions = (foodbankId: string) => {
	// Need to get all items that are in stock, check what restrictions they meet, and concat
	return ["Dairy Free", "Gluten Free", "Vegan"];
};

export { getFoodbankRestrictions, getFoodbankStockLevel };
