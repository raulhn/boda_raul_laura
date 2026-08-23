import { API_URL } from "../config";
import { peticionServicio } from "./serviceComun.js";

export async function obtenerRetos() {
  try {
    const url = `${API_URL}/obtenerRetos`;
    const respuesta = await peticionServicio("GET", url);
    return respuesta.retos;
  } catch (error) {
    console.error("Error en obtenerRetos:", error);
    throw new Error("Error en obtenerRetos: " + error.message);
  }
}
