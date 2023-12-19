import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

// Serve static files (e.g., your React frontend)
app.use(express.static(path.join(__dirname, 'build')));

// Define an endpoint to serve the chess-like component
app.get('/chesslike', (req, res) => {
  res.send('Hello, World!');
});

// This displays a message that the server is running and listening to the specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
})