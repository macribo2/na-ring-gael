const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define MongoDB Schema and Models
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

app.use('/phaser-resources', express.static(path.join(__dirname, 'public/phaser-resources')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
