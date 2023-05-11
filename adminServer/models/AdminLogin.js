import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      }
});

const registerModel = mongoose.model("register", registerSchema);

export default registerModel;
