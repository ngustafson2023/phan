import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type User = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  password: string;
  isFoodBank: Boolean;
  location: String;
  visible: Boolean;
  openHours: Date;
  closingHours: Date;
  dateJoined: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const UserSchema = new Schema({
  // The user's username
  username: {
    type: String,
    required: true,
  },
  // The user's password
  password: {
    type: String,
    required: true,
  },

  isFoodBank: { type: Boolean, default: false },

  location: { type: String, required: false },
  visible: { type: Boolean, required: false },
  openHours: { type: Date, required: false },
  closingHours: { type: Date, required: false },
  // The date the user joined
  dateJoined: {
    type: Date,
    required: true,
  },
});

const UserModel = model<User>("User", UserSchema);
export default UserModel;
