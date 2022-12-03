import type { HydratedDocument, Types } from "mongoose";
import type { FoodBank } from "./model";
import FoodBankModel from "./model";

class FoodBankCollection {
	/**
	 * Find foodbanks with filters.
	 *
	 * @param {string} userId - The userId of the user to find
	 * @return {Promise<HydratedDocument<FoodBank>> | Promise<null>} - The user with the given username, if any
	 */
	static async findFoodbanks(stockLevels: string[], restrictions: string[]): Promise<HydratedDocument<FoodBank>> {
		return FoodBankModel.where();
	}
}

export default FoodBankCollection;
