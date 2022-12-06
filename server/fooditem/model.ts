import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

// Type definition for FoodItem on the backend
export type FoodItem = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  foodBankId: Types.ObjectId;
  name: String;
  quantity: Number;
  restrictions: String[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// FoodItems stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FoodItemSchema = new Schema({
  foodBankId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  restrictions: [{ type: String, required: false }],
});

const FoodItemModel = model<FoodItem>("FoodItem", FoodItemSchema);
export default FoodItemModel;
