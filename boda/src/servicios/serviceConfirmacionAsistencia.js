import { peticionServicio } from "./serviceComun.js";
import { URL_API } from "../constantes.js";

export async function confirmarAsistencia(
  nombre_completo,
  correo_electronico,
  telefono,
  asistencia,
  num_asistentes,
  restricciones_alimentarias,
  mensaje,
) {
  try {
    const url = URL_API + "/confirmar-asistencia/";
    const body = {
      nombre_completo,
      correo_electronico,
      telefono,
      asistencia,
      num_asistentes,
      restricciones_alimentarias,
      mensaje,
    };
    const respuesta = await peticionServicio("POST", url, body);
    return respuesta;
  } catch (error) {
    console.error("Error en confirmarAsistencia:", error);
    throw new Error("Error en confirmarAsistencia: " + error.message);
  }
}
