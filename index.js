const express = require('express');
const { createServer } = require('node:http');
const { exec } = require("child_process");
const bodyParser = require("body-parser");

const fs = require('fs');
const path = require('path');
const PORT = 5000;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
    const payload = req.body;
	console.log("Webhook received")
    if (payload.ref === "refs/heads/main") {
        console.log("Changes detected on main. Pulling latest changes...");

		exec("cd /home/jakob/Desktop/jakobmichaelsen.dk/ && sudo git fetch --all && sudo git reset --hard origin/main && sudo git pull", (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${stderr}`);
                return res.status(500).send("Git pull failed");
            }
            console.log(`Git Pull Output: ${stdout}`);
            res.status(200).send("Updated successfully");
        });
    } else {
        res.status(200).send("Not on main, ignoring...");
    }
});



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
