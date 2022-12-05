import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

// Type definition for Slot on the backend
export type Slot = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  foodBankId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  quantity: Number;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Slots stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const SlotSchema = new Schema({
  foodBankId: { type: Schema.Types.ObjectId, required: true, ref: "FoodBank" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 0 },
});

const SlotModel = model<Slot>("Slot", SlotSchema);
export default SlotModel;
