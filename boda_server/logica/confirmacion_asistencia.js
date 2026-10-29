import * as wrapperBD from "../bd/wrapperBD.js";
import pool from "../bd/conexion.js";

export async function insertar_confirmacion_asistencia(
  nombre_completo,
  correo_electronico,
  telefono,
  asistencia,
  num_asistentes,
  mensaje,
) {
  try {
    const sql =
      "insert into confirmacion_asistencia (nombre_completo, correo_electronico, telefono, asistencia, num_asistentes, mensaje) values (" +
      pool.escape(nombre_completo) +
      ", " +
      pool.escape(correo_electronico) +
      ", " +
      pool.escape(telefono) +
      ", " +
      pool.escape(asistencia) +
      ", " +
      pool.escape(num_asistentes) +
      ", " +
      pool.escape(mensaje) +
      ")";
    const results = await wrapperBD.actualiza(sql);
    return results.insertId;
  } catch (error) {
    console.error(
      "Error en la función insertar_confirmacion_asistencia:",
      error,
    );
    throw new Error("Error en la función insertar_confirmacion_asistencia");
  }
}

export async function obtener_confirmaciones_asistencia() {
  try {
    const sql = "select * from confirmacion_asistencia";
    const results = await wrapperBD.consulta(sql);
    return results;
  } catch (error) {
    console.error(
      "Error en la función obtener_confirmaciones_asistencia:",
      error,
    );
    throw new Error("Error en la función obtener_confirmaciones_asistencia");
  }
}
