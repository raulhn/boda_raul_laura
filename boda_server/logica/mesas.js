import * as wrapperBD from "../bd/wrapperBD.js";
import pool from "../bd/conexion.js";

export async function obtenerMesas() {
  try {
    const sql = "select * from mesas";
    const results = await wrapperBD.consulta(sql);
    return results;
  } catch (error) {
    console.error("Error en la función obtenerMesas:", error);
    throw new Error("Error en la función obtenerMesas");
  }
}

export async function insertaMesa(nombreMesa, descripcion) {
  try {
    const sql =
      "insert into mesas (nombre_mesa, deescripcion) values (" +
      pool.escape(nombreMesa) +
      ", " +
      pool.escape(descripcion) +
      ")";

    const results = await wrapperBD.actualiza(sql);
    return results.insertId;
  } catch (error) {
    console.error("Error en la función insertaMesa:", error);
    throw new Error("Error en la función insertaMesa");
  }
}

export async function actualizarMesa(idMesa, nombreMesa, descripcion) {
  try {
    const sql =
      "update mesas set nombre_mesa = " +
      pool.escape(nombreMesa) +
      ", deescripcion = " +
      pool.escape(descripcion) +
      " where id_mesa = " +
      pool.escape(idMesa);
    const results = await wrapperBD.actualiza(sql);
    return results.affectedRows > 0;
  } catch (error) {
    console.error("Error en la función actualizarMesa:", error);
    throw new Error("Error en la función actualizarMesa");
  }
}

export async function eliminarMesa(idMesa) {
  try {
    const sql = "delete from mesas where id_mesa = " + pool.escape(idMesa);
    const results = await wrapperBD.actualiza(sql);
    return results.affectedRows > 0;
  } catch (error) {
    console.error("Error en la función eliminarMesa:", error);
    throw new Error("Error en la función eliminarMesa");
  }
}
