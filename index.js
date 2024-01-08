const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema and Models

// Example Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Example Route
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



































// import express from 'express';
// import path from 'path';

// const app = express();
// const port = process.env.PORT || 5000;

// // Serve static files (e.g., your React frontend)
// app.use(express.static(path.join(__dirname, 'build')));

// // Define an endpoint to serve the chess-like component
// app.get('/chesslike', (req, res) => {
//   res.send('Hello, World!');
// });

// // This displays a message that the server is running and listening to the specified port
// app.listen(port, () => console.log(`Listening on port ${port}`));

// // Create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// })