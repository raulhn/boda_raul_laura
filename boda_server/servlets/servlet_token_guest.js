import { consulta } from "../bd/wrapperBD.js";
import jwt from "jsonwebtoken";

// Handler for token login (guest users)
export function login(req, res) {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  // 1. Find the token in the database
  const sql = "SELECT id_mesa FROM tabla_tokens_mesa WHERE token = ? AND activo = TRUE";
  consulta(sql, [token])
    .then(results => {
      if (results && results.length > 0) {
        const idMesa = results[0].id_mesa;
        
        // 2. Generate Session Cookie
        // The session will be identified by the mesa_id
        const sessionData = { mesa_id: idMesa };
        const sessionToken = jwt.sign(sessionData, "SESSION_SECRET_KEY", { expiresIn: "1h" }); // Using a simple internal secret key for the session cookie
        
        // Set the cookie
        res.cookie("session_cookie", sessionToken, { httpOnly: true, secure: true });
        
        // 3. Successful login - redirect to the table dashboard
        return res.redirect(`/mesas/dashboard/${idMesa}`);
      } else {
        return res.status(401).json({ error: "Invalid or inactive token" });
      }
    })
    .catch(error => {
      console.error("Token login error:", error);
      return res.status(500).json({ error: "Server error during login process" });
    });
}
