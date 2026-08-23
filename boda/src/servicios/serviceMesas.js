import { API_URL } from "../config";
import { peticionServicio } from "./serviceComun.js";

export async function obtenerMesas() {
  try {
    const url = `${API_URL}/obtenerMesas`;
    const respuesta = await peticionServicio("GET", url);
    return respuesta.mesas;
  } catch (error) {
    console.error("Error en obtenerMesas:", error);
    throw new Error("Error en obtenerMesas: " + error.message);
  }
}
