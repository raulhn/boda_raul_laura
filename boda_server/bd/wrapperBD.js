import pool from "./conexion.js";

export async function consulta(sql, values) {
  try {
    const [results] = await pool.query(sql, values);
    return results;
  } catch (error) {
    console.error("Error al ejecutar consulta:", error);
    throw error;
  }
}

export async function actualiza(sql, values) {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [results] = await connection.query(sql, values);
    await connection.commit();
    return results;
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error("Error al revertir transacción:", rollbackError);
    }

    console.error("Error al ejecutar actualización:", error);
    throw error;
  } finally {
    connection?.release();
  }
}
