import type { HydratedDocument, Types } from "mongoose";
import type { Slot } from "./model";
import SlotModel from "./model";

class SlotCollection {
	/**
	 * Add a new slot
	 *
	 * @param {string} foodBankId - The id of the foodbank
	 * @param {Date} startTime - The start time of the slot
	 * @param {Date} endTime - The end time of the slot
	 * @param {Number} quantity - the amount of availability in this slot
	 * @return {Promise<HydratedDocument<Slot>>} - The newly created slot
	 */
	static async addOne(foodBankId: string, startTime: Date, endTime: Date, quantity: Number): Promise<HydratedDocument<Slot>> {

		const slot = new SlotModel({foodBankId, startTime, endTime, quantity});
		await slot.save(); // Saves slot to MongoDB
		return slot;
	}





	/**
	 * Find slot that searchTime falls within.
	 *
	 * @param {Date} searchTime - The userId of the user to find
	 * @return {Promise<HydratedDocument<Slot>> | Promise<null>} - The slots that satisfy the search, if any
	 */
	static async findFoodbanks(searchTime: Date): Promise<HydratedDocument<Slot>> {
		return SlotModel.where();
	}
}

export default SlotCollection;
