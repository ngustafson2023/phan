import type { Types } from "mongoose";
import { Schema, model } from "mongoose";
import { Slot } from "server/slot/model";
import { User } from "server/user/model";
import type { FoodItem } from "../fooditem/model";

// Type definition for Order on the backend
export type Order = {
	_id: Types.ObjectId; // MongoDB assigns each object this ID on creation
	userId: Types.ObjectId;
	slotId: Types.ObjectId;
	items: [FoodItem];
};

export type PopulatedOrder = {
	_id: Types.ObjectId; // MongoDB assigns each object this ID on creation
	userId: User;
	slotId: Slot;
	items: [FoodItem];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Orders stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const OrderSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	slotId: { type: Schema.Types.ObjectId, required: true, ref: "Slot" },
	items: [{ type: Schema.Types.ObjectId, required: true, ref: "FoodItem" }],
});

const OrderModel = model<Order>("Order", OrderSchema);
export default OrderModel;
