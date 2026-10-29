import * as confirmacionAsistenciaService from "../services/confirmacion_asistencia_service.js";

export async function insertarConfirmacionAsistencia(req, res) {
  try {
    const {
      nombre_completo,
      correo_electronico,
      telefono,
      asistencia,
      mensaje,
    } = req.body;
    await confirmacionAsistenciaService.insertarConfirmacionAsistencia(
      nombre_completo,
      correo_electronico,
      telefono,
      asistencia,
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
      await confirmacionAsistenciaService.obtenerConfirmacionesAsistencia();
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
