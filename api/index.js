import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const __dirname = path.resolve();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all route (Express 5 SAFE)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handler (LAST)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message, success: false });
});

// Start server (ABSOLUTELY LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
