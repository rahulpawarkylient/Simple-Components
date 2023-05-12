import mongoose from "mongoose";

const notifySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("notification", notifySchema);

export default Notification;
