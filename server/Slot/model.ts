import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Slot = {
	_id: Types.ObjectId; // MongoDB assigns each object this ID on creation
	foodBankId: Types.ObjectId;
	startTime: Date;
	endTime: Date;
	quantity:number;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const SlotSchema = new Schema({
	// The slot's associated foodbank's id
	foodBankId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	// The slots's start time
	startTime: {
		type: Date,
		required: true,
	},
	// The slots's end time
	endTime: {
		type: Date,
		required: true,
	},
	// The slots's quantity/ capacity
	quantity: {
		type: Number,
		required: true,
	}
});

const SlotModel = model<Slot>("Slot", SlotSchema);
export default SlotModel;
