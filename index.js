const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Define a port
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
