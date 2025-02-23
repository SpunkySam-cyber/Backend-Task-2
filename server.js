import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Routes
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (use a cloud DB, e.g. MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Serve static files from the `public` folder
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For all routes NOT starting with /api, serve files from `public`
app.use(express.static(path.join(__dirname, 'public')));

// If you want to serve `index.html` as the default for non-API routes:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
