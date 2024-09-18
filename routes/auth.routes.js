require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt"); // For password hashing
const { userModel } = require("../models/user.model");
const authRouter = express.Router();

// User Registration Route
authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const newUser = new userModel({ email, password: hashedPassword });

    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login Route
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // Compare password with hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Set session cookie
    res.cookie("sessionId", email, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.send({
      message: "login successful",
      user: {
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Logout Route
authRouter.post("/logout", (req, res) => {
  // Clear the session cookie
  res.clearCookie("sessionId");
  res.send("Logged out successfully");
});

module.exports = { authRouter };
