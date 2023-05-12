import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    });

const FAQModel = mongoose.model("FAQ", faqSchema);

export default FAQModel;


