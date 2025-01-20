// server.js (Backend API)
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
const upload = multer({ dest: "uploads/" }); // For handling image uploads

const users = []; // Dummy user database

// Register endpoint
app.post("/api/register", upload.single("image"), (req, res) => {
  const { username, firstName, lastName, email, phoneNumber, address } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!username || !firstName || !lastName || !email || !phoneNumber || !address) {
    return res.status(400).send("All fields are required.");
  }

  // Save user data
  users.push({ username, firstName, lastName, email, phoneNumber, address, image });
  res.send({ success: true });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  // Dummy authentication (replace with real check)
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ username }, "your_jwt_secret", { expiresIn: "1h" });
  res.send({ success: true, token });
});

app.listen(5000, () => console.log("Server running on port 5000"));
