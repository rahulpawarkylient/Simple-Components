import registerModel from "../models/AdminLogin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EmailError, RequireFields } from "../message.js";

/* Login Start */

// Login endpoint
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await registerModel.findOne({ email });
    if (!user) {
      // If user with given email is not found in the database, return a 401 error response
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the passwords do not match, return a 401 error response
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { user: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Set token expiration time to 1 hour
    );

    // Return a success response with the JWT token
    res.status(200).json({ message: "Admin Login Success..", token });
  } catch (error) {
    // Handle any errors that occur during the login process
    console.log(error.message);
    res.status(500).json({ message: "Error while logging in" });
  }
};

/* Login  End */

/* Register Section Start */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: RequireFields });
    }

    // Check if user with the same email already exists
    const user = await registerModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: EmailError });
    }

    // Check if password meets the requirements
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new registerModel({
      name,
      email,
      password: hashedPassword,
      isAdmin: true, // set isAdmin to true for admin user
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};


/* Register Section End */
