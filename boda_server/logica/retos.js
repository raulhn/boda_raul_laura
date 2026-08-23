import * as wrapperBD from "../bd/wrapperBD.js";
import pool from "../bd/conexion.js";

export async function obtenerRetos() {}
{
  try {
    const sql = "select * from retos";
    const results = await wrapperBD.consulta(sql);
    return results;
  } catch (error) {
    console.error("Error en la función obtenerRetos:", error);
    throw new Error("Error en la función obtenerRetos");
  }
}

export async function insertaReto(nombreReto, descripcion) {
  try {
    const sql =
      "insert into retos (nombre_reto, descripcion) values (" +
      pool.escape(nombreReto) +
      ", " +
      pool.escape(descripcion) +
      ")";

    const results = await wrapperBD.actualiza(sql);
    return results.insertId;
  } catch (error) {
    console.error("Error en la función insertaReto:", error);
    throw new Error("Error en la función insertaReto");
  }
}

export async function actualizarReto(idReto, nombreReto, descripcion) {
  try {
    const sql =
      "update retos set nombre_reto = " +
      pool.escape(nombreReto) +
      ", descripcion = " +
      pool.escape(descripcion) +
      " where id_reto = " +
      pool.escape(idReto);

    const results = await wrapperBD.actualiza(sql);
    return results.affectedRows > 0;
  } catch (error) {
    console.error("Error en la función actualizarReto:", error);
    throw new Error("Error en la función actualizarReto");
  }
}

export async function eliminarReto(idReto) {
  try {
    const sql = "delete from retos where id_reto = " + pool.escape(idReto);
    const results = await wrapperBD.actualiza(sql);
    return results.affectedRows > 0;
  } catch (error) {
    console.error("Error en la función eliminarReto:", error);
    throw new Error("Error en la función eliminarReto");
  }
}

export async function obtenerRetoPorId(idReto) {
  try {
    const sql = "select * from retos where id_reto = " + pool.escape(idReto);
    const results = await wrapperBD.consulta(sql);
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en la función obtenerRetoPorId:", error);
    throw new Error("Error en la función obtenerRetoPorId");
  }
}

export async function obtenerRetos() {
  try {
    const sql = "select * from retos";
    const results = await wrapperBD.consulta(sql);
    return results;
  } catch (error) {
    console.error("Error en la función obtenerRetos:", error);
    throw new Error("Error en la función obtenerRetos");
  }
}
