import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Authentication middleware (you might already have this)
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

import User from "../models/user.js";

// Existing dashboard endpoint
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to the dashboard!", user: req.user });
});

// New endpoint: Get all users (protected)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
