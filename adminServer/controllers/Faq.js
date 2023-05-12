import FAQModel from "../models/Faq.js";

// Create a new FAQ
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validate input fields
    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Please provide both question and answer." });
    }

    // Create a new FAQ
    const newFaq = new FAQModel({
      question,
      answer,
    });

    // Save the new FAQ to the database
    await newFaq.save();

    // Send a success response with the new FAQ object
    return res.status(201).json(newFaq);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all FAQs
export const getFaq = async (req, res) => {
  try {
    const faqs = await FAQModel.find();
    return res.json(faqs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete an FAQ
export const deleteFaq = async (req, res) => {
    const Id = req.params.id
    console.log(Id)
    try {
      await FAQModel.findByIdAndDelete(Id);
      return res.json({ message: "FAQ deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
