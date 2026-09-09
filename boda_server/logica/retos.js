import * as wrapperBD from "../bd/wrapperBD.js";
import pool from "../bd/conexion.js";

export async function obtenerRetos(idMesa = null) {
  try {
    let sql = "select * from retos";
    let params = [];

    if (idMesa) {
      sql = `
        select r.*
        from retos r
        join mesa_retos mr on r.id_reto = mr.id_reto
        where mr.id_mesa = ? and mr.estado = 'activo'
      `;
      params = [idMesa];
    }

    const results = await wrapperBD.consulta(sql, params);
    return results;
  } catch (error) {
    console.error("Error en la función obtenerRetos:", error);
    throw new Error("Error en la función obtenerRetos");
  }
}

export async function insertaReto(nombreReto, descripcion, estado, icono) {
  try {
    const sql =
      "insert into retos (nombre_reto, descripcion, estado, icono) values (" +
      pool.escape(nombreReto) +
      ", " +
      pool.escape(descripcion) +
      ", " +
      pool.escape(estado) +
      ", " +
      pool.escape(icono) +
      ")";

    const results = await wrapperBD.actualiza(sql);
    return results.insertId;
  } catch (error) {
    console.error("Error en la función insertaReto:", error);
    throw new Error("Error en la función insertaReto");
  }
}

export async function actualizarReto(
  idReto,
  nombreReto,
  descripcion,
  estado,
  icono,
) {
  try {
    const sql =
      "update retos set nombre_reto = " +
      pool.escape(nombreReto) +
      ", descripcion = " +
      pool.escape(descripcion) +
      ", estado = " +
      pool.escape(estado) +
      ", icono = " +
      pool.escape(icono) +
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

export async function asignarRetoAMesa(idMesa, idReto, estado = "activo") {
  try {
    const resultado = await wrapperBD.actualiza(
      "UPDATE mesa_retos SET estado = ? WHERE id_mesa = ? AND id_reto = ?",
      [estado, idMesa, idReto],
    );
    if (resultado.affectedRows === 0) {
      await wrapperBD.actualiza(
        "INSERT INTO mesa_retos (id_mesa, id_reto, estado) VALUES (?, ?, ?)",
        [idMesa, idReto, estado],
      );
    }
  } catch (error) {
    console.error("Error en la función asignarRetoAMesa:", error);
    throw new Error("Error en la función asignarRetoAMesa");
  }
}
