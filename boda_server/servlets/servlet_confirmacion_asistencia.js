import * as confirmacionAsistencia from "../logica/confirmacion_asistencia.js";

export async function insertarConfirmacionAsistencia(req, res) {
  try {
    const {
      nombre_completo,
      correo_electronico,
      telefono,
      asistencia,
      num_asistentes,
      restricciones_alimentarias,
      mensaje,
    } = req.body;
    await confirmacionAsistencia.insertar_confirmacion_asistencia(
      nombre_completo,
      correo_electronico,
      telefono,
      asistencia,
      num_asistentes,
      restricciones_alimentarias,
      mensaje,
    );
    res
      .status(200)
      .json({ message: "Confirmación de asistencia insertada correctamente" });
  } catch (error) {
    console.error("Error en la función insertarConfirmacionAsistencia:", error);
    res
      .status(500)
      .json({ error: "Error al insertar la confirmación de asistencia" });
  }
}

export async function obtenerConfirmacionesAsistencia(req, res) {
  try {
    const confirmaciones =
      await confirmacionAsistencia.obtener_confirmaciones_asistencia();
    res.status(200).json({ error: false, confirmaciones: confirmaciones });
  } catch (error) {
    console.error(
      "Error en la función obtenerConfirmacionesAsistencia:",
      error,
    );
    res
      .status(500)
      .json({ error: "Error al obtener las confirmaciones de asistencia" });
  }
}
