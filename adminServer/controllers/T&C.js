import TandCModel from "../models/T&C.js";

// CREATE A POST API FOR T&C
export const createTandC = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide both title and description." });
    }

    // Create a new T&C
    const newTandC = new TandCModel({
      title,
      description,
    });

    // Save the new T&C to the database
    await newTandC.save();

    // Send a success response with the new T&C object
    return res.status(201).json(newTandC);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// CREATE A GET API FOR T&C
export const getTandC = async (req, res) => {
  try {
    const TandC = await TandCModel.find();
    return res.json(TandC);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTandC = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      // Validate input fields
      if (!title || !description) {
        return res.status(400).json({ message: "Please provide both title and description." });
      }
  
      // Find and update the T&C
      const updatedTandC = await TandCModel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true } // return the updated document
      );
  
      // Check if T&C exists
      if (!updatedTandC) {
        return res.status(404).json({ message: "T&C not found" });
      }
  
      // Send a success response with the updated T&C object
      return res.status(200).json(updatedTandC);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  