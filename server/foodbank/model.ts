import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type FoodBank = {
	_id: Types.ObjectId; // MongoDB assigns each object this ID on creation
	name: string;
	address: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FoodBankSchema = new Schema({
	// The fb's name
	name: {
		type: String,
		required: true,
	},
	// The fb's address
	address: {
		type: String,
		required: true,
	},
});

const FoodBankModel = model<FoodBank>("FoodBank", FoodBankSchema);
export default FoodBankModel;
