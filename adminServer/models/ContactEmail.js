import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    address1: {
      type: String,
      required: true,
      trim: true,
    },
    address2: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("EmailContact", userSchema);

export default userModel;