import type { HydratedDocument, Types } from "mongoose";
import SlotModel, { Slot } from "./model";

class SlotCollection {
	/**
	 * adds slot to collection.
	 *
	 * @return {Promise<HydratedDocument<Slot>> } - slot added
	 */
	static async addOne(
		foodBankId: Types.ObjectId | string,
		startTime: Date,
		quantity: Number
	): Promise<HydratedDocument<Slot>> {
		const newSlot = new SlotModel({ foodBankId, startTime, quantity });

		return (await newSlot.save()).populate("foodBankId");
	}

	/**
	 * finds slot
	 *
	 * @return {Promise<HydratedDocument<Slot> | null> } - slot found
	 */
	static async findOne(
		foodBankId: Types.ObjectId,
		startTime: Date,
		quantity: Number
	): Promise<HydratedDocument<Slot>> {
		const newSlot = SlotModel.findOne({
			foodBankId,
			startTime,
			quantity,
		});

    return newSlot.populate("foodBankId");
  }

	/**
	 * finds slot by Id
	 *
	 * @return {Promise<HydratedDocument<Slot> | null> } - slot found
	 */
	static async findOneById(slotId: Types.ObjectId | string): Promise<HydratedDocument<Slot>> {
		const newSlot = SlotModel.findOne({
			_id: slotId,
		});

    return newSlot.populate("foodBankId");
  }

  static async findAllByFoodBankId(foodBankId: Types.ObjectId | string): Promise<Array<HydratedDocument<Slot>>> {
    return SlotModel.find({foodBankId: foodBankId});
  }

	/**
	 * updates slot by Id
	 *
	 * @return {Promise<HydratedDocument<Slot>> } - slot updated
	 */
	static async updateOneById(
		slotId: Types.ObjectId,
		startTime?: Date,
		quantity?: Number
	): Promise<HydratedDocument<Slot>> {
		const slot = await SlotModel.findOne({ _id: slotId });

		if (startTime) {
			slot.startTime = startTime;
		}

		if (quantity) {
			slot.quantity = quantity;
		}
		await slot.save();
		return slot.populate('foodBankId');
  }

	/**
	 * delete slot based on filter
	 *
	 * @return {Promise<HydratedDocument<Slot>> | Promise<null>} - The user with the given username, if any
	 */
	static async deleteByFilter(filter: any): Promise<Number> {
		return (await SlotModel.deleteMany(...filter)).deletedCount;
	}
}

export default SlotCollection;
