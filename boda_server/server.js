import jwt from "jsonwebtoken";
import express from "express";
import bodyParser from "body-parser";

import * as servletUser from "./servlets/servlet_user.js";

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = process.env.TOKENAUTH; // Replace with your own secret key

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
}

// Example route to generate a JWT token (for testing purposes)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const bLogin = servletUser.login(req, res);
  if (!bLogin) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
  const user = { name: username };
  const accessToken = jwt.sign(user, SECRET_KEY);
  res.json({ accessToken });
});

app.use((req, res, next) => {
  authenticateToken(req, res, next);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
