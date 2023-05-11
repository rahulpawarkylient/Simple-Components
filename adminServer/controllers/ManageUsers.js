import bcrypt from "bcrypt";
import User from "../models/ManageUsers.js";
import { EmailError, RequireFields } from "../message.js";

// REGISTER-USER

export const registerUser = async (req, res) => {
  try {
    // Destructure req.body for readability
    const { name, email, gender, password, mobile, role, status } = req.body;

    // Validate user input and return early on error
    if (!name || !email || !password || !mobile || !gender) {
      return res.status(400).json({ error: RequireFields });
    }

    // Check if the email is already registered and return early on error
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: EmailError });
    }

    // Hash the password and create a new user document
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      gender,
      password: hashedPassword,
      mobile,
      role,
      status,
    });

    // Save the user document to the database
    await user.save();

    // Return a success response
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // Return an error response
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// GET ALL USERS

// Define the userAllget function as an async function that accepts req and res parameters
export const userAllget = async (req, res) => {
  try {
    // Get the search query parameter from the request
    const searchQuery = req.query.search || '';

    // Fetch all the user data from the database using the User model
    const userData = await User.find();

    // Filter the user data based on the search query
    const filteredUserData = userData.filter(user => {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // If the data is fetched and filtered successfully, send a response with status code 200 and the filtered data
    res.status(200).json(filteredUserData);
  } catch (error) {
    // If any error occurs while fetching the data, log the error to the console and send a response with status code 500 and an error message
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET By ID  USER
// export const userGetbyId = async (req, res) => {
//   try {
//     const { Id } = req.params;
//     const userData = await User.findById(Id);
//     res.status(200).json(userData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

//Get api By id
export const userGetById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update API
export const userUpdatebyId = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, gender, password, mobile, role } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, gender, password, mobile, role },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete user API
export const userDeleteById = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Data Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// --------------========================================================================------------------

//USER STATUS TOGGLE TRUE AND FALSE TRUE => ACTIVE, FALSE => INACTIVE

export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user document by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Toggle the status
    user.status = !user.status;

    // Save the updated user document to the database
    await user.save();

    // Return a success response
    res.status(200).json({
      message: "User status updated successfully.",
      status: user.status ? "active" : "inactive",
    });
  } catch (error) {
    // Return an error response
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// ------------------============================================================--------------------------

//USER ROLE IS DEFINE FUNCTION IS HERE

export const toggleUserRole = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user document by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // // Toggle the role
    switch (user.role) {
      case "admin":
        user.role = "manager";
        break;
      case "manager":
        user.role = "user";
        break;
      case "user":
        user.role = "admin";
        break;
      default:
        break;
    }

    // Save the updated user document to the database
    await user.save();

    // Return a success response
    res
      .status(200)
      .json({ message: "User role updated successfully.", role: user.role });
  } catch (error) {
    // Return an error response
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};
