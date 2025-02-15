const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
    const payload = req.body;

    if (payload.ref === "refs/heads/main") {
        console.log("Changes detected on main. Pulling latest changes...");

        exec("cd /path/to/your/repo && git pull", (err, stdout, stderr) => {
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

app.listen(3000, () => console.log("Webhook server running on port 3000"));
