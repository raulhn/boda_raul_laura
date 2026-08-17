import { peticionServicio } from "./peticionServicio.js";

export async function loginUsuario(usuario, contrasena) {
  try {
    const url = "/api/login";
    const body = { usuario, contrasena };
    const respuesta = await peticionServicio("POST", url, body);
    return respuesta;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw new Error("Error en loginUsuario: " + error.message);
  }
}
