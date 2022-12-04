import type { HydratedDocument, Types } from "mongoose";
import type { FoodBank } from "./model";
import FoodBankModel from "./model";
import { getFoodbankRestrictions, getFoodbankStockLevel } from "./util";

class FoodBankCollection {
	/**
	 * Find foodbanks with filters.
	 *
	 * @param {string} userId - The userId of the user to find
	 * @return {Promise<HydratedDocument<FoodBank>> | Promise<null>} - The user with the given username, if any
	 */
	static async findFoodbanks(stockLevels: string[], restrictions: string[]): Promise<HydratedDocument<FoodBank>[]> {
		const banks = await FoodBankModel.find({});
		const filteredBanks = banks
			.filter((b) => stockLevels.includes(getFoodbankStockLevel(b._id)))
			.filter((b) => {
				const bankRestrictions = getFoodbankRestrictions(b._id);
			});
		return filteredBanks;
	}

	/**
	 * Find a food bank by username (case insensitive).
	 *
	 * @param {string} username - The username of the food bank to find
	 * @return {Promise<HydratedDocument<FoodBank>> | Promise<null>} - The food bank with the given username, if any
	 */
	static async findOneByUsername(username: string): Promise<HydratedDocument<FoodBank>> {
		return FoodBankModel.findOne({name: new RegExp(`^${username.trim()}$`, 'i')});
	}
}

export default FoodBankCollection;
