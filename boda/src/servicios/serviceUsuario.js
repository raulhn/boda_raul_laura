import { peticionServicio } from "./serviceComun.js";
import { URL_API } from "../config.js";

export async function loginUsuario(usuario, contrasena) {
  try {
    const url = URL_API + "/login";
    const body = { usuario, contrasena };
    const respuesta = await peticionServicio("POST", url, body);
    return respuesta;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw new Error("Error en loginUsuario: " + error.message);
  }
}
