const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = "logins.txt";

// Middleware
app.use(express.json());
app.use(cors());

// Save User Data (⚠️ Not Secure, Just for Testing)
app.post("/save", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    const data = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile(path, data, (err) => {
        if (err) {
            return res.status(500).send("Error saving data.");
        }
        res.send("Login data saved.");
    });
});

// Retrieve User Data
app.get("/get-logins", (req, res) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading data.");
        }
        res.send(data);
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
