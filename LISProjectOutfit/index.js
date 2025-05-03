const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use('/public', express.static('public'));

// Home route to render HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
