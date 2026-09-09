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
import { login as tokenLogin } from "./servlets/servlet_token_guest.js";

// ...

const app = express();
const apiRouter = express.Router();
app.use(bodyParser.json());
app.use(cookieParser());

const SECRET_KEY = process.env.TOKENAUTH; // Replace with your own secret key
const SESSION_SECRET = "SESSION_SECRET_KEY"; // Secret key for session cookies

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  // 1. Check for existing JWT token (Admin/Registered user)
  const accessToken = req.cookies.access_token;
  if (accessToken) {
    try {
      const user = jwt.verify(accessToken, SECRET_KEY);
      req.user = user;
      return next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid authentication token" });
    }
  }

  // 2. Check for session cookie (Guest user)
  const sessionId = req.cookies.session_cookie;
  if (sessionId) {
    try {
      const sessionData = jwt.verify(sessionId, SESSION_SECRET);
      // For guests, we rely solely on the mesa_id for identification
      req.session = { mesa_id: sessionData.mesa_id };
      req.user = { role: "guest" }; // Assign a guest role
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid guest session" });
    }
  }

  return res.sendStatus(401); // No valid token or session found
}

// New Token Login route for guests
import * as servletAdmin from "./servlets/servlet_admin.js";

// Middleware to check for admin role
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Access denied: Admin privileges required." });
}

import * as servletPhotos from "./servlets/servlet_photos.js";

// The client sends every API request to /api_boda. Login remains public while
// the rest of the routes share the authentication middleware.
apiRouter.post("/login", servletUser.login);
apiRouter.post("/sesion-invitado/:token", tokenLogin);
apiRouter.get("/token-login/:token", tokenLogin);

apiRouter.use(authenticateToken);

// Admin-only routes for mesas and retos.
apiRouter.post(
  "/admin/generate-tokens",
  isAdmin,
  servletAdmin.generarTokensParaMesas,
);
apiRouter.get("/admin/tokens-mesa", isAdmin, servletAdmin.obtenerTokensMesas);
apiRouter.post(
  "/admin/mesas/:idMesa/token",
  isAdmin,
  servletAdmin.generarTokenMesa,
);
apiRouter.get("/obtenerMesas", isAdmin, servletMesa.obtenerMesas);
apiRouter.post("/insertarMesa", isAdmin, servletMesa.insertarMesa);
apiRouter.put("/actualizarMesa", isAdmin, servletMesa.actualizarMesa);
apiRouter.delete("/eliminarMesa/:idMesa", isAdmin, servletMesa.eliminarMesa);
apiRouter.get("/obtenerRetos", servletReto.obtenerRetos);
apiRouter.get("/obtenerRetosMesa", servletReto.obtenerRetosMesa);
apiRouter.post("/insertarReto", isAdmin, servletReto.insertarReto);
apiRouter.put("/actualizarReto", isAdmin, servletReto.actualizarReto);
apiRouter.delete("/eliminarReto/:idReto", isAdmin, servletReto.eliminarReto);
apiRouter.post("/asignarRetoMesa", isAdmin, servletReto.asignarRetoAMesa);
apiRouter.post("/asignarRetosMesas", isAdmin, servletReto.asignarRetosMesas);

// Photo Upload Endpoint (Protected)
apiRouter.post(
  "/fotos/subir",
  servletPhotos.procesarSubida,
  servletPhotos.subirFoto,
);

app.use("/static/photos", express.static(servletPhotos.PHOTO_DIR));
app.use("/api_boda", apiRouter);
app.use("/", apiRouter);

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
