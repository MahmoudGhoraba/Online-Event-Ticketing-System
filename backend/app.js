const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.ORIGIN, // e.g. https://your-app.onrender.com
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const authRouter = require('./Routes/auth');
const bookingRouter = require('./Routes/booking');
const eventRouter = require('./Routes/event');
const userRouter = require('./Routes/user');

// API Routing
app.use('/api/v1', authRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

// MongoDB connection
const db_url = `${process.env.DB_URL}/${process.env.DB_NAME}`;
mongoose
  .connect(db_url)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((e) => console.error('❌ MongoDB connection error:', e));

// Serve frontend (React static files from /client)
app.use(express.static(path.join(__dirname, 'client')));

// React Router fallback — serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// 404 fallback (optional, React handles most 404s now)
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
