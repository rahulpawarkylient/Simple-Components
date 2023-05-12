import mongoose from "mongoose";

const TandCSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TandCModel = mongoose.model("T&C", TandCSchema);

export default TandCModel;
