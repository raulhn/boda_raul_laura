import { URL_API } from "../constantes.js";
import { peticionServicio } from "./serviceComun.js";

export async function obtenerRetos() {
  try {
    const url = `${URL_API}/obtenerRetos`;
    const respuesta = await peticionServicio("GET", url);
    return respuesta.retos;
  } catch (error) {
    console.error("Error en obtenerRetos:", error);
    throw new Error("Error en obtenerRetos: " + error.message);
  }
}

export async function insertarReto(nombreReto, descripcion, estado, icono) {
  try {
    return await peticionServicio("POST", `${URL_API}/insertarReto`, {
      nombreReto,
      descripcion,
      estado,
      icono,
    });
  } catch (error) {
    throw new Error("Error en insertarReto: " + error.message);
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
    return await peticionServicio("PUT", `${URL_API}/actualizarReto`, {
      idReto,
      nombreReto,
      descripcion,
      estado,
      icono,
    });
  } catch (error) {
    throw new Error("Error en actualizarReto: " + error.message);
  }
}

export async function eliminarReto(idReto) {
  try {
    return await peticionServicio("DELETE", `${URL_API}/eliminarReto/${idReto}`);
  } catch (error) {
    throw new Error("Error en eliminarReto: " + error.message);
  }
}
