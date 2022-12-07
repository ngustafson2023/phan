import type { HydratedDocument } from "mongoose";
import { Slot } from "./model";
import moment from "moment";

type SlotResponse = {
  _id: string;
  foodBankId: string;
  startTime: Date;
  endTime: Date;
  quantity: Number;
};

/**
 * Transform a raw slot object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Slot>} slot
 * @returns {SlotResponse} - The foodItem object formatted for the frontend
 */
const constructSlotItemResponse = (
  foodItem: HydratedDocument<Slot>
): SlotResponse => {
  const slotCopy: Slot = {
    ...foodItem.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };


  return {
    ...slotCopy,
    _id: slotCopy._id.toString(),
    foodBankId: slotCopy.foodBankId._id.toString(),
    startTime: slotCopy.startTime,
    endTime: slotCopy.endTime,
    quantity: slotCopy.quantity,
  };
};

export { constructSlotItemResponse };
