import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "user"],
    default: "user",
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
