const express = require('express');
const { createServer } = require('node:http');

const fs = require('fs');
const path = require('path');
const PORT = 5000;

const app = express();
const server = createServer(app);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/projects', (req, res) => {
	fs.readFile('data.json', function(err, data) {
		if (err) throw err;
		const projects = JSON.parse(data);
		res.send(projects);
	});
});

app.get('/test', (req,res) => {
	res.send('test-works')
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
