import { consulta } from "../bd/wrapperBD.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const token = req.body?.token ?? req.query.token;
  if (typeof token !== "string" || token.trim().length === 0) {
    return res.status(400).json({ error: "El token de mesa es obligatorio." });
  }

  try {
    const results = await consulta(
      "SELECT id_mesa FROM tabla_tokens_mesa WHERE token = ? AND activo = TRUE",
      [token.trim()],
    );

    if (results && results.length > 0) {
      const idMesa = results[0].id_mesa;
      const sessionData = { mesa_id: idMesa };
      const sessionToken = jwt.sign(
        sessionData,
        process.env.SESSION_SECRET || process.env.TOKENAUTH,
        { expiresIn: "4h" },
      );

      res.cookie("session_cookie", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 4 * 60 * 60 * 1000,
      });
      return res.status(200).json({ success: true, idMesa });
    }

    return res.status(401).json({ error: "Token de mesa inválido o inactivo." });
  } catch (error) {
    console.error("Token login error:", error);
    return res.status(500).json({ error: "No se ha podido iniciar la sesión." });
  }
}