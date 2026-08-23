import "dotenv/config";
import jwt from "jsonwebtoken";
import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import cookieParser from "cookie-parser";

import * as servletUser from "./servlets/servlet_user.js";
import * as servletMesa from "./servlets/servlet_mesas.js";
import * as servletReto from "./servlets/servlet_retos.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const SECRET_KEY = process.env.TOKENAUTH; // Replace with your own secret key

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
}

// Example route to generate a JWT token (for testing purposes)
app.post("/login", servletUser.login);

app.use((req, res, next) => {
  authenticateToken(req, res, next);
});

app.get("/obtenerMesas", servletMesa.obtenerMesas);
app.post("/insertarMesa", servletMesa.insertarMesa);
app.put("/actualizarMesa", servletMesa.actualizarMesa);
app.delete("/eliminarMesa/:idMesa", servletMesa.eliminarMesa);
app.get("/obtenerRetos", servletReto.obtenerRetos);
app.post("/insertarReto", servletReto.insertarReto);
app.put("/actualizarReto", servletReto.actualizarReto);
app.delete("/eliminarReto/:idReto", servletReto.eliminarReto);

// Start the server
const PORT = process.env.PORT || 8084;

https
  .createServer(
    {
      key: fs.readFileSync("apache/apache.key"),
      cert: fs.readFileSync("apache/apache-certificate.crt"),
    },
    app,
  )
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
