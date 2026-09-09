import { URL_API } from "../constantes.js";
import { peticionServicio } from "./serviceComun.js";

export async function iniciarSesionInvitado(token) {
  return peticionServicio("POST", `${URL_API}/sesion-invitado`, { token });
}

export async function obtenerRetosInvitado() {
  const respuesta = await peticionServicio("GET", `${URL_API}/obtenerRetos`);
  return respuesta.retos;
}

export async function subirFotoReto(retoId, foto) {
  const formData = new FormData();
  formData.append("retoId", retoId);
  formData.append("foto", foto);

  const respuesta = await fetch(`${URL_API}/fotos/subir`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const contenido = await respuesta.text();
  let data = null;
  if (contenido) {
    try {
      data = JSON.parse(contenido);
    } catch {
      data = { message: contenido };
    }
  }

  if (!respuesta.ok) {
    throw new Error(
      data?.error || data?.message || "No se ha podido subir la foto.",
    );
  }

  return data;
}
