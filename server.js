import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from "./models/user.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes using ES module syntax
import authRoutes from "./routes/auth.js";
import protectedRoute from "./routes/protected.js";

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoute);

// // Simple test route
// app.get('/', (req, res) => {
//   res.send('Request received');
// });
app.get('/', async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude password field
      res.json(users);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
});

  

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
