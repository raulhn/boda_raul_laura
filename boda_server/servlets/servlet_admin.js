import crypto from "crypto";
import { actualiza, consulta } from "../bd/wrapperBD.js";
import * as Gestor_Mesa from "../logica/mesas.js";

async function guardarTokenMesa(idMesa) {
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
  return { idMesa, token };
}

export async function generarTokensParaMesas(req, res) {
  try {
    const mesas = await Gestor_Mesa.obtenerMesas();
    const tokens = await Promise.all(
      mesas.map(({ id_mesa: idMesa }) => guardarTokenMesa(idMesa)),
    );

    return res.status(200).json({ tokens });
  } catch (error) {
    console.error("Error al generar tokens para mesas:", error);
    return res
      .status(500)
      .json({ error: "No se han podido generar los tokens de las mesas." });
  }
}

export async function obtenerTokensMesas(req, res) {
  try {
    const mesas = await consulta(`
      SELECT m.id_mesa, m.nombre_mesa, m.descripcion, t.token
      FROM mesa m
      LEFT JOIN tabla_tokens_mesa t ON t.id_mesa = m.id_mesa AND t.activo = TRUE
      ORDER BY m.id_mesa
    `);
    return res.status(200).json({ mesas });
  } catch (error) {
    console.error("Error al obtener los tokens de las mesas:", error);
    return res
      .status(500)
      .json({ error: "No se han podido obtener los tokens de las mesas." });
  }
}

export async function generarTokenMesa(req, res) {
  const idMesa = Number(req.params.idMesa);
  if (!Number.isInteger(idMesa) || idMesa <= 0) {
    return res.status(400).json({ error: "La mesa indicada no es válida." });
  }

  try {
    const mesas = await consulta("SELECT 1 FROM mesa WHERE id_mesa = ?", [idMesa]);
    if (mesas.length === 0) {
      return res.status(404).json({ error: "Mesa no encontrada." });
    }

    return res.status(200).json(await guardarTokenMesa(idMesa));
  } catch (error) {
    console.error("Error al generar el token de la mesa:", error);
    return res
      .status(500)
      .json({ error: "No se ha podido generar el token de la mesa." });
  }
}