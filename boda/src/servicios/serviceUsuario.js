import { peticionServicio } from "./serviceComun.js";
import { URL_API } from "../constantes.js";

export async function loginUsuario(usuario, contrasena) {
  try {
    const url = URL_API + "/login";
    const body = { usuario: usuario, password: contrasena };
    const respuesta = await peticionServicio("POST", url, body);
    return respuesta;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw new Error("Error en loginUsuario: " + error.message);
  }
}

export async function loginToken(token) {
  try {
    const url = URL_API + "/token-login/" + token;
    const respuesta = await peticionServicio("GET", url);
    return respuesta;
  } catch (error) {
    console.error("Error en loginToken:", error);
    throw new Error("Error en loginToken: " + error.message);
  }
}
