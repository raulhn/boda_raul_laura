import crypto from "crypto";
import { actualiza } from "../bd/wrapperBD.js";
import * as Gestor_Mesa from "../logica/mesas.js";

export async function generarTokensParaMesas(req, res) {
  try {
    const mesas = await Gestor_Mesa.obtenerMesas();
    const tokens = [];

    for (const { id_mesa: idMesa } of mesas) {
      const token = crypto.randomBytes(32).toString("hex");
      const resultado = await actualiza(
        `UPDATE tabla_tokens_mesa
         SET token = ?, activo = TRUE, fecha_creacion = CURRENT_TIMESTAMP
         WHERE id_mesa = ?`,
        [token, idMesa],
      );
      if (resultado.affectedRows === 0) {
        await actualiza(
          "INSERT INTO tabla_tokens_mesa (id_mesa, token, activo) VALUES (?, ?, TRUE)",
          [idMesa, token],
        );
      }
      tokens.push({ idMesa, token });
    }

    return res.status(200).json({ tokens });
  } catch (error) {
    console.error("Error al generar tokens para mesas:", error);
    return res
      .status(500)
      .json({ error: "No se han podido generar los tokens de las mesas." });
  }
}