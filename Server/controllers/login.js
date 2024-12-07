const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {users} = require("../models");
require("dotenv").config();
const JWT_SECRET = "your_jwt_secret";

// Registrasi pengguna baru
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({ firstName, lastName, email, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login pengguna
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
    
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      error: "Error logging in",
      details: error.message || "An unexpected error occurred",
    });
  }
};

module.exports = { register, login };