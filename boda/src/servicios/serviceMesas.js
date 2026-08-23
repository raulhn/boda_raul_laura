import { URL_API } from "../constantes.js";
import { peticionServicio } from "./serviceComun.js";

export async function obtenerMesas() {
  try {
    const url = `${URL_API}/obtenerMesas`;
    const respuesta = await peticionServicio("GET", url);
    return respuesta.mesas;
  } catch (error) {
    console.error("Error en obtenerMesas:", error);
    throw new Error("Error en obtenerMesas: " + error.message);
  }
}

export async function insertarMesa(nombreMesa, descripcion) {
  try {
    return await peticionServicio("POST", `${URL_API}/insertarMesa`, {
      nombreMesa,
      descripcion,
    });
  } catch (error) {
    throw new Error("Error en insertarMesa: " + error.message);
  }
}

export async function actualizarMesa(idMesa, nombreMesa, descripcion) {
  try {
    return await peticionServicio("PUT", `${URL_API}/actualizarMesa`, {
      idMesa,
      nombreMesa,
      descripcion,
    });
  } catch (error) {
    throw new Error("Error en actualizarMesa: " + error.message);
  }
}

export async function eliminarMesa(idMesa) {
  try {
    return await peticionServicio("DELETE", `${URL_API}/eliminarMesa/${idMesa}`);
  } catch (error) {
    throw new Error("Error en eliminarMesa: " + error.message);
  }
}
